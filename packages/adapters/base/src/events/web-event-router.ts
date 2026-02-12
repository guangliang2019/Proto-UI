// packages/adapters/base/src/events/web-event-router.ts

type Unsub = () => void;

type Listener = {
  type: string;
  cb: any;
  options?: any;
  wrapped?: any;
};

export function createWebProtoEventRouter(opt: {
  rootEl: HTMLElement;
  globalEl?: EventTarget; // window by default
  isEnabled: () => boolean; // bridge to eventGate
}) {
  // proto semantic bus: press.*, pointer.*, key.*, context.menu...
  const protoRootBus = new EventTarget();
  const protoGlobalBus = new EventTarget();

  const rootEl = opt.rootEl;
  const globalEl = opt.globalEl ?? window;

  // --- helper: emit proto event to proto bus ---
  function emit(target: EventTarget, type: string, native: any) {
    const ev = new CustomEvent(type, { detail: native });
    target.dispatchEvent(ev);
  }

  // -------------------------
  // (A) 固定监听：解释“协议语义事件”
  // -------------------------
  // 这些是你愿意为每个组件实例支付的固定成本（尽量少）
  const unsubs: Unsub[] = [];

  // pointer -> pointer.*
  unsubs.push(
    listen(rootEl, "pointerdown", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "pointer.down", e);
    })
  );
  unsubs.push(
    listen(rootEl, "pointermove", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "pointer.move", e);
    })
  );
  unsubs.push(
    listen(rootEl, "pointerup", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "pointer.up", e);
    })
  );
  unsubs.push(
    listen(rootEl, "pointercancel", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "pointer.cancel", e);
    })
  );
  unsubs.push(
    listen(rootEl, "pointerenter", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "pointer.enter", e);
    })
  );
  unsubs.push(
    listen(rootEl, "pointerleave", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "pointer.leave", e);
    })
  );

  // key -> key.* (global)
  unsubs.push(
    listen(globalEl, "keydown", (e: KeyboardEvent) => {
      if (!opt.isEnabled()) return;
      emit(protoGlobalBus, "key.down", e);

      // minimal v0 mapping: activate keys => press.commit
      if (e.key === "Enter" || e.key === " ") {
        emit(protoRootBus, "press.commit", e);
      }
    })
  );

  unsubs.push(
    listen(globalEl, "keyup", (e: KeyboardEvent) => {
      if (!opt.isEnabled()) return;
      emit(protoGlobalBus, "key.up", e);
    })
  );

  // click -> press.commit (root)
  unsubs.push(
    listen(rootEl, "click", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "press.commit", e);
    })
  );

  // contextmenu -> context.menu
  unsubs.push(
    listen(rootEl, "contextmenu", (e) => {
      if (!opt.isEnabled()) return;
      emit(protoRootBus, "context.menu", e);
    })
  );

  // -------------------------
  // (B) 懒绑定：native:* / host.*
  // -------------------------
  const rootProxy = createProxyTarget({
    protoBus: protoRootBus,
    nativeTarget: rootEl,
    // hostTarget：先工作假设= nativeTarget；未来你可以换成更准确的 host 专用 target
    hostTarget: rootEl,
    isEnabled: opt.isEnabled,
    // 注：rootProxy 不做“解释”，只做“路由 + gating”
  });

  const globalProxy = createProxyTarget({
    protoBus: protoGlobalBus,
    nativeTarget: globalEl,
    hostTarget: globalEl,
    isEnabled: opt.isEnabled,
  });

  return {
    /** Inject these into EVENT_*_TARGET_CAP */
    rootTarget: rootProxy as EventTarget,
    globalTarget: globalProxy as EventTarget,

    dispose() {
      for (const u of unsubs.splice(0)) u();
      rootProxy.__dispose?.();
      globalProxy.__dispose?.();
    },
  };
}

function listen(t: any, type: string, cb: (ev: any) => void): Unsub {
  t.addEventListener(type, cb as any);
  return () => t.removeEventListener(type, cb as any);
}

function createProxyTarget(args: {
  protoBus: EventTarget;
  nativeTarget: EventTarget;
  hostTarget: EventTarget;
  isEnabled: () => boolean;
}) {
  // 记录已转发到 native/host 的监听器，便于 remove 时精确解绑
  const nativeListeners: Listener[] = [];
  const hostListeners: Listener[] = [];

  // 为 native/host 分支加 gating：eventGate disable 后，这些也不应该再进 proto 回调
  // 这点非常关键，否则“unmount 后还能触发回调”的竞态会回来。
  function wrapWithGate(cb: any) {
    return (ev: any) => {
      if (!args.isEnabled()) return;
      cb(ev);
    };
  }

  function parseType(type: string) {
    if (type.startsWith("native:")) {
      return { kind: "native" as const, inner: type.slice("native:".length) };
    }
    if (type.startsWith("host.")) {
      return { kind: "host" as const, inner: type.slice("host.".length) };
    }
    return { kind: "proto" as const, inner: type };
  }

  const api: any = {
    addEventListener(type: string, cb: any, options?: any) {
      const p = parseType(String(type));

      if (p.kind === "proto") {
        // proto semantic event: on proto bus
        args.protoBus.addEventListener(p.inner, cb, options);
        return;
      }

      if (p.kind === "native") {
        const wrapped = wrapWithGate(cb);
        nativeListeners.push({ type: p.inner, cb, options, wrapped } as any);
        args.nativeTarget.addEventListener(p.inner, wrapped as any, options);
        return;
      }

      // host.*
      const wrapped = wrapWithGate(cb);
      hostListeners.push({ type: p.inner, cb, options, wrapped } as any);
      args.hostTarget.addEventListener(p.inner, wrapped as any, options);
    },

    removeEventListener(type: string, cb: any, options?: any) {
      const p = parseType(String(type));

      if (p.kind === "proto") {
        args.protoBus.removeEventListener(p.inner, cb, options);
        return;
      }

      const list = p.kind === "native" ? nativeListeners : hostListeners;
      const target = p.kind === "native" ? args.nativeTarget : args.hostTarget;

      // latest-first removal aligns with your v0 matching习惯
      for (let i = list.length - 1; i >= 0; i--) {
        const r: any = list[i];
        if (r.type !== p.inner) continue;
        if (r.cb !== cb) continue;
        // options 匹配这里先用 Object.is（和 DOM 一样复杂就复杂了）
        // 你若坚持“plain object shallow compare”，可以把 sameOptions 搬进来
        if (!Object.is(r.options, options)) continue;

        target.removeEventListener(p.inner, r.wrapped as any, options);
        list.splice(i, 1);
        return;
      }
    },

    dispatchEvent(ev: Event) {
      // 对外暴露的 dispatch：默认只派发到 protoBus
      // （nativeTarget/hostTarget 的 dispatch 由真实 DOM 自己完成）
      return args.protoBus.dispatchEvent(ev);
    },

    // best-effort cleanup (not required by EventTarget)
    __dispose() {
      // 主动解绑所有已懒绑定的 native/host listener，避免残留
      for (const r of nativeListeners.splice(0)) {
        args.nativeTarget.removeEventListener(
          r.type,
          // @ts-ignore
          r.wrapped as any,
          r.options
        );
      }
      for (const r of hostListeners.splice(0)) {
        args.hostTarget.removeEventListener(
          r.type,
          // @ts-ignore
          r.wrapped as any,
          r.options
        );
      }
    },
  };

  return api;
}
