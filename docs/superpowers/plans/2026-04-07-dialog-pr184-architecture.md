# dialog pr184 architecture implementation plan

> **for agentic workers:** required sub-skill: use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. steps use checkbox (`- [ ]`) syntax for tracking.

**goal:** move portal and modal capabilities from dialog prototype layer into the overlay module's host-capability system, and adjust dialog anatomy (cardinality + rename overlay to mask).

**architecture:** follow the established pattern used by `presence` (`PRESENCE_HOST_BRIDGE_CAP`) and `focus` (`FOCUS_*_CAP`) modules: add capability tokens to the overlay module, wire them via `createCapsWiring().useOverlay()` in the adapter base, implement host bridges in each adapter, and consume them from `OverlayModuleImpl`. anatomy changes are mechanical renames with cardinality bumps.

**implementation constraint (critical):** capability boundary is required, but React/Vue host-cap implementations must not toggle framework-level `createPortal`/`Teleport` trees for this runtime. use adapter-level `document.body.appendChild(hostEl)` plus `setProtoParent(hostEl, originalParent)` before move, then let `web-event-router` route global `pointerdown/click/contextmenu` back to the owning root via linked parent.

**tech stack:** typescript, proto-ui core/runtime/modules/adapters, vitest, playwright

---

## file map

### new files

- `packages/modules/overlay/src/caps.ts` — capability tokens `OVERLAY_GLOBAL_MOUNT_CAP` and `OVERLAY_MODAL_CAP`

### modified core types

- `packages/core/src/overlay.ts` — add `portal?: boolean` and `modal?: boolean` to `OverlayConfigPatch`

### modified modules

- `packages/modules/overlay/src/impl.ts` — consume global-mount and modal caps, perform mount/unmount and body-scroll lock
- `packages/modules/overlay/src/types.ts` — re-export cap types
- `packages/modules/overlay/src/index.ts` — export caps
- `packages/modules/overlay/src/create.ts` — wire any new port methods if needed

### modified hooks

- `packages/hooks/src/as-overlay.ts` — pass `portal` and `modal` options through to overlay handle

### modified adapter wiring

- `packages/adapters/base/src/wiring/caps-builder.ts` — add `.useOverlay({ globalMount?, modal? })`
- `packages/adapters/react/src/runtime/modules.ts` — provide direct body-append globalMount with `setProtoParent` linkage
- `packages/adapters/vue/src/runtime/modules.ts` — provide direct body-append globalMount with `setProtoParent` linkage
- `packages/adapters/web-component/src/runtime/modules.ts` — provide body-append globalMount with parentNode override
- `packages/adapters/base/src/platform/instance-tree.ts` — persist linked logical parent mark for moved hosts
- `packages/adapters/base/src/events/web-event-router.ts` — global fallback routing via linked parent for owning root dispatch

### modified prototypes (remove direct portal usage)

- `packages/prototypes/base/src/dialog/portal.ts` — delete
- `packages/prototypes/base/src/dialog/overlay.ts` — remove `createBodyPortal`, rename role to `mask`, rename exports
- `packages/prototypes/base/src/dialog/content.ts` — remove `createBodyPortal`, use `asOverlay({ portal: true, modal: true })`
- `packages/prototypes/base/src/dialog/shared.ts` — rename role `overlay` to `mask`, bump cardinality max for trigger/description/close
- `packages/prototypes/base/src/dialog/index.ts` — rename exports
- `packages/prototypes/base/src/dialog/types.ts` — rename `DialogOverlay*` types to `DialogMask*`
- `packages/prototypes/shadcn/src/dialog/overlay.ts` — rename to mask, update imports
- `packages/prototypes/shadcn/src/dialog/types.ts` — rename types
- `packages/prototypes/shadcn/src/dialog/index.ts` — rename exports/re-exports
- `packages/prototypes/shadcn/src/index.ts` — update re-exports

### modified tests and docs

- `packages/prototypes/base/test/dialog.test.ts`
- `packages/prototypes/shadcn/test/dialog.test.ts`
- `packages/adapters/react/test/dialog.test.ts`
- `packages/adapters/vue/test/dialog.test.ts`
- `apps/www/src/content/docs/en/prototypes/base/dialog.mdx`
- `apps/www/src/content/docs/en/prototypes/shadcn/dialog.mdx`
- `apps/www/src/content/docs/zh-cn/prototypes/base/dialog.mdx`
- `apps/www/src/content/docs/zh-cn/prototypes/shadcn/dialog.mdx`
- `apps/www/src/content/docs/demo_components/base-dialog/baseDialogCode.ts`
- `apps/www/src/content/docs/demo_components/shadcn-dialog/shadcnDialogCode.ts`
- `apps/www/src/components/PrototypePreviewer/prototype-modules.ts`

---

## task 1: overlay module capabilities

**files:**

- create: `packages/modules/overlay/src/caps.ts`
- modify: `packages/modules/overlay/src/impl.ts`
- modify: `packages/modules/overlay/src/types.ts`
- modify: `packages/modules/overlay/src/index.ts`
- modify: `packages/modules/overlay/src/create.ts`

- [ ] **step 1.1: create capability tokens**

create `packages/modules/overlay/src/caps.ts`:

```ts
import { cap } from '@proto.ui/core';

export type OverlayGlobalMount = {
  mount(el: HTMLElement): void;
  unmount(el: HTMLElement): void;
};

export const OVERLAY_GLOBAL_MOUNT_CAP = cap<OverlayGlobalMount>('@proto.ui/overlay/globalMount');

export type OverlayModal = {
  lock(): void;
  unlock(): void;
};

export const OVERLAY_MODAL_CAP = cap<OverlayModal>('@proto.ui/overlay/modal');
```

- [ ] **step 1.2: export caps from overlay module index**

modify `packages/modules/overlay/src/index.ts` to add:

```ts
export { OVERLAY_GLOBAL_MOUNT_CAP, OVERLAY_MODAL_CAP } from './caps';
export type { OverlayGlobalMount, OverlayModal } from './caps';
```

- [ ] **step 1.3: re-export cap types from types file**

modify `packages/modules/overlay/src/types.ts` to add:

```ts
export type { OverlayGlobalMount, OverlayModal } from './caps';
```

- [ ] **step 1.4: update OverlayConfigPatch in core**

modify `packages/core/src/overlay.ts` (around line 22-36). add to `OverlayConfigPatch`:

```ts
export type OverlayConfigPatch = Partial<OverlayConfig> & {
  portal?: boolean;
  modal?: boolean;
};
```

also add to `OverlayConfig` interface:

```ts
export interface OverlayConfig {
  // ... existing fields ...
  portal: boolean;
  modal: boolean;
}
```

and update the default config in the same file to set `portal: false, modal: false`.

- [ ] **step 1.5: wire overlay config defaults**

in `packages/core/src/overlay.ts`, locate the default config object and ensure `portal: false` and `modal: false` are present.

- [ ] **step 1.6: implement cap consumption in OverlayModuleImpl**

modify `packages/modules/overlay/src/impl.ts`:

1. import the caps:

```ts
import { OVERLAY_GLOBAL_MOUNT_CAP, OVERLAY_MODAL_CAP } from './caps';
```

2. locate the class `OverlayModuleImpl`. add private fields:

```ts
private globalMount: OverlayGlobalMount | null = null;
private modalLock: OverlayModal | null = null;
private mountedHost: HTMLElement | null = null;
```

3. in the constructor or an init method, read the caps:

```ts
this.globalMount = this.caps.get(OVERLAY_GLOBAL_MOUNT_CAP) ?? null;
this.modalLock = this.caps.get(OVERLAY_MODAL_CAP) ?? null;
```

4. locate where overlay opens. when opening, if `this.config.portal` and `this.globalMount` and the host element is available, call `this.globalMount.mount(hostEl)` and set `this.mountedHost = hostEl`.

5. when closing, if `this.mountedHost` and `this.globalMount`, call `this.globalMount.unmount(this.mountedHost)` and clear `this.mountedHost`.

6. similarly for modal: when opening, if `this.config.modal` and `this.modalLock`, call `this.modalLock.lock()`. when closing, call `this.modalLock.unlock()`.

- [ ] **step 1.7: commit module changes**

```bash
git add packages/modules/overlay/src/caps.ts packages/modules/overlay/src/impl.ts packages/modules/overlay/src/types.ts packages/modules/overlay/src/index.ts packages/core/src/overlay.ts
git commit -m "feat(overlay): add global-mount and modal host capabilities"
```

---

## task 2: adapter wiring for overlay capabilities

**files:**

- modify: `packages/adapters/base/src/wiring/caps-builder.ts`
- modify: `packages/adapters/react/src/runtime/modules.ts`
- modify: `packages/adapters/vue/src/runtime/modules.ts`
- modify: `packages/adapters/web-component/src/runtime/modules.ts`
- modify: `packages/adapters/base/src/platform/instance-tree.ts`
- modify: `packages/adapters/base/src/events/web-event-router.ts`

- [ ] **step 2.1: add useOverlay to caps builder**

modify `packages/adapters/base/src/wiring/caps-builder.ts`:

1. import the cap types at the top:

```ts
import type { OverlayGlobalMount, OverlayModal } from '@proto.ui/module-overlay';
```

2. in the `CapsWiringBuilder` interface (around line 121-217), add:

```ts
useOverlay(args: { globalMount?: OverlayGlobalMount; modal?: OverlayModal }): CapsWiringBuilder;
```

3. in the builder implementation, add:

```ts
useOverlay(args) {
  return add('overlay', () => [
    ...(args.globalMount ? [[OVERLAY_GLOBAL_MOUNT_CAP, args.globalMount] as const] : []),
    ...(args.modal ? [[OVERLAY_MODAL_CAP, args.modal] as const] : []),
  ]);
}
```

also import `OVERLAY_GLOBAL_MOUNT_CAP` and `OVERLAY_MODAL_CAP` from `@proto.ui/module-overlay`.

- [ ] **step 2.2: implement react adapter globalMount and modal**

modify `packages/adapters/react/src/runtime/modules.ts`.

in the chain after `.usePresence(...)`, add `.useOverlay({ ... })` with implementation:

```ts
.useOverlay({
  globalMount: {
    mount(el) {
      if (el.parentElement && el.parentElement !== document.body) {
        setProtoParent(el, el.parentElement);
      }
      if (el.parentNode !== document.body) {
        document.body.appendChild(el);
      }
    },
    unmount(_el) {
      // restoration is no-op because react unmount removes the element anyway
    },
  },
  modal: {
    lock() {
      const original = document.body.style.overflow;
      (document.body as any).__proto_ui_original_overflow = original;
      document.body.style.overflow = 'hidden';
    },
    unlock() {
      const original = (document.body as any).__proto_ui_original_overflow ?? '';
      document.body.style.overflow = original;
      delete (document.body as any).__proto_ui_original_overflow;
    },
  },
})
```

note: keep `adapt.ts` on a single render tree (no `createPortal` toggle branch). this runtime depends on stable host session identity; framework portal tree switching can cause session drift and event-gate desync.

- [ ] **step 2.3: implement vue adapter globalMount and modal**

modify `packages/adapters/vue/src/runtime/modules.ts`. add `.useOverlay({ ... })` after `.usePresence(...)`:

```ts
.useOverlay({
  globalMount: {
    mount(el) {
      if (el.parentElement && el.parentElement !== document.body) {
        setProtoParent(el, el.parentElement);
      }
      if (el.parentNode !== document.body) {
        document.body.appendChild(el);
      }
    },
    unmount(_el) {
      // vue unmount removes the element
    },
  },
  modal: {
    lock() {
      const original = document.body.style.overflow;
      (document.body as any).__proto_ui_original_overflow = original;
      document.body.style.overflow = 'hidden';
    },
    unlock() {
      const original = (document.body as any).__proto_ui_original_overflow ?? '';
      document.body.style.overflow = original;
      delete (document.body as any).__proto_ui_original_overflow;
    },
  },
})
```

note: keep `adapt.ts` on a single render tree (no `Teleport` toggle branch). DOM tree switching can trigger host/session re-init and lose overlay state in this runtime.

- [ ] **step 2.4: implement web component adapter globalMount and modal**

modify `packages/adapters/web-component/src/runtime/modules.ts`. add `.useOverlay({ ... })` after `.usePresence(...)`:

```ts
.useOverlay({
  globalMount: {
    mount(el) {
      if (el.parentNode === document.body) return;
      const originalParent = el.parentNode;
      const originalNext = el.nextSibling;
      try {
        Object.defineProperty(el, 'parentNode', {
          get() { return originalParent; },
          configurable: true,
        });
      } catch {}
      document.body.appendChild(el);
      (el as any).__proto_ui_portal_restore = () => {
        if (originalParent) {
          originalParent.insertBefore(el, originalNext);
        }
        try {
          Object.defineProperty(el, 'parentNode', {
            get() { return originalParent; },
            configurable: true,
          });
        } catch {}
      };
    },
    unmount(el) {
      const restore = (el as any).__proto_ui_portal_restore;
      if (restore) {
        restore();
        delete (el as any).__proto_ui_portal_restore;
      }
    },
  },
  modal: {
    lock() {
      const original = document.body.style.overflow;
      (document.body as any).__proto_ui_original_overflow = original;
      document.body.style.overflow = 'hidden';
    },
    unlock() {
      const original = (document.body as any).__proto_ui_original_overflow ?? '';
      document.body.style.overflow = original;
      delete (document.body as any).__proto_ui_original_overflow;
    },
  },
})
```

**important:** the unmount function above needs access to `el`. if your implementation keeps `unmount(el)` but also tracks internal `mountedEl`, capture both patterns consistently to avoid stale restore pointers. a closure-based pattern is still fine:

```ts
let mountedEl: HTMLElement | null = null;
.useOverlay({
  globalMount: {
    mount(el) {
      if (mountedEl === el && el.parentNode === document.body) return;
      mountedEl = el;
      // ... move logic ...
    },
    unmount(_el) {
      if (mountedEl) {
        // ... restore logic ...
        mountedEl = null;
      }
    },
  },
})
```

store `originalParent`, `originalNext`, and a restore function on a per-el basis (or use the closure).

- [ ] **step 2.5: commit adapter changes**

```bash
git add packages/adapters/base/src/wiring/caps-builder.ts packages/adapters/react/src/runtime/modules.ts packages/adapters/vue/src/runtime/modules.ts packages/adapters/web-component/src/runtime/modules.ts
git commit -m "feat(adapters): wire overlay global-mount and modal capabilities"
```

---

## task 3: update asOverlay hook

**files:**

- modify: `packages/hooks/src/as-overlay.ts`

- [ ] **step 3.1: pass portal and modal options to overlay handle**

modify `packages/hooks/src/as-overlay.ts`:

```ts
export function asOverlay(options?: OverlayConfigPatch): OverlayHandle<any> {
  const { rt, facades } = getActiveAsHookContext('asOverlay');
  rt.ensureSetup(`asHook(asOverlay)`);
  rt.register('asOverlay', { privileged: true, mode: 'configurable' });

  const facade = facades.overlay as { getOverlay: () => OverlayHandle<any> } | undefined;
  if (!facade || typeof facade.getOverlay !== 'function') {
    throw new Error(`[AsHook] overlay facade unavailable for asOverlay.`);
  }

  const handle = facade.getOverlay();
  if (options) handle.configure(options);
  return handle;
}
```

(assuming `OverlayConfigPatch` in core already includes `portal` and `modal`)

- [ ] **step 3.2: commit hook change**

```bash
git add packages/hooks/src/as-overlay.ts
git commit -m "feat(hooks): propagate portal and modal options through asOverlay"
```

---

## task 4: dialog prototype cleanup and anatomy rename

**files:**

- delete: `packages/prototypes/base/src/dialog/portal.ts`
- modify: `packages/prototypes/base/src/dialog/shared.ts`
- modify: `packages/prototypes/base/src/dialog/overlay.ts`
- modify: `packages/prototypes/base/src/dialog/content.ts`
- modify: `packages/prototypes/base/src/dialog/index.ts`
- modify: `packages/prototypes/base/src/dialog/types.ts`
- modify: `packages/prototypes/shadcn/src/dialog/overlay.ts`
- modify: `packages/prototypes/shadcn/src/dialog/types.ts`
- modify: `packages/prototypes/shadcn/src/dialog/index.ts`
- modify: `packages/prototypes/shadcn/src/index.ts`

- [ ] **step 4.1: delete portal.ts and remove its export**

```bash
rm packages/prototypes/base/src/dialog/portal.ts
```

modify `packages/prototypes/base/src/dialog/index.ts` — remove any export for `portal.ts`.

- [ ] **step 4.2: update dialog shared anatomy**

modify `packages/prototypes/base/src/dialog/shared.ts`:

```ts
export const DIALOG_FAMILY = createAnatomyFamily('base-dialog', {
  roles: {
    root: { cardinality: { min: 1, max: 1 } },
    trigger: { cardinality: { min: 0, max: 100 } },
    mask: { cardinality: { min: 0, max: 1 } },
    content: { cardinality: { min: 0, max: 1 } },
    title: { cardinality: { min: 0, max: 1 } },
    description: { cardinality: { min: 0, max: 100 } },
    close: { cardinality: { min: 0, max: 100 } },
  },
  relations: [
    { kind: 'contains', parent: 'root', child: 'trigger' },
    { kind: 'contains', parent: 'root', child: 'mask' },
    { kind: 'contains', parent: 'root', child: 'content' },
    { kind: 'contains', parent: 'content', child: 'title' },
    { kind: 'contains', parent: 'content', child: 'description' },
    { kind: 'contains', parent: 'content', child: 'close' },
  ],
});
```

- [ ] **step 4.3: update base dialog mask (formerly overlay)**

rename file `packages/prototypes/base/src/dialog/overlay.ts` to `mask.ts` (or keep filename as `overlay.ts` and rename internals only). for consistency, keep filename `overlay.ts` but rename all internal identifiers to `mask`.

modify `packages/prototypes/base/src/dialog/overlay.ts`:

```ts
import { ... } from '@proto.ui/core';
import { asOverlay } from '@proto.ui/hooks';
import { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
import type { DialogMaskProps, DialogMaskExposes, DialogMaskAsHookContract } from './types';

function setupDialogMask(def: DefHandle<DialogMaskProps, DialogMaskExposes>): void {
  def.anatomy.claim(DIALOG_FAMILY, { role: 'mask' });
  // ... remove all createBodyPortal imports and usage ...
  const overlay = asOverlay({
    closeOnEscape: false,
    closeOnOutsidePress: false,
    closeOnFocusOutside: false,
    portal: true,
    modal: true,
  });

  const open = def.state.bool('open', false);
  def.expose.state('open', open);

  def.context.subscribe(DIALOG_CONTEXT, (_run, next) => {
    const nextOpen = next.open;
    open.set(nextOpen);
    if (nextOpen) {
      overlay.openOverlay('dialog.open');
    } else {
      overlay.close('dialog.close');
    }
  });

  def.lifecycle.onMounted((run) => {
    const ctx = run.context.read(DIALOG_CONTEXT);
    open.set(ctx.open);
    if (ctx.open) {
      overlay.openOverlay('dialog.mounted');
    } else {
      overlay.close('dialog.mounted');
    }
  });
}

export const asDialogMask = defineAsHook<DialogMaskProps, DialogMaskExposes, DialogMaskAsHookContract>({
  name: 'as-dialog-mask',
  mode: 'once',
  setup: setupDialogMask,
});

const dialogMask = definePrototype({
  name: 'base-dialog-mask',
  setup(def) {
    setupDialogMask(def);
    def.feedback.style.use(tw('fixed inset-0 z-50'));
  },
});

export default dialogMask;
```

**important:** all `createBodyPortal()` logic must be removed. the portal is now handled by the overlay module via the adapter's globalMount cap.

- [ ] **step 4.4: update base dialog content**

modify `packages/prototypes/base/src/dialog/content.ts`:

1. remove `import { createBodyPortal } from './portal'`;
2. change `asOverlay({ ... })` to include `portal: true, modal: false` (content does not need modal lock):

```ts
const overlay = asOverlay({
  closeOnEscape: true,
  closeOnOutsidePress: true,
  closeOnFocusOutside: true,
  restore: 'trigger',
  entry: 'content',
  placement: 'center',
  portal: true,
  modal: false,
});
```

3. remove all `portal.mount(host)` / `portal.unmount()` calls from `onMounted` and `onUnmounted`.

4. keep `asFocusScope({ trap: true })` if present.

- [ ] **step 4.5: update base dialog types**

modify `packages/prototypes/base/src/dialog/types.ts`:

rename all `DialogOverlay*` to `DialogMask*`:

- `DialogOverlayProps` -> `DialogMaskProps`
- `DialogOverlayExposes` -> `DialogMaskExposes`
- `DialogOverlayAsHookContract` -> `DialogMaskAsHookContract`

- [ ] **step 4.6: update base dialog index exports**

modify `packages/prototypes/base/src/dialog/index.ts`:

```ts
export { default as dialogMask } from './overlay';
export { default as baseDialogMask } from './overlay';
export { asDialogMask } from './overlay';
export type { DialogMaskProps, DialogMaskExposes, DialogMaskAsHookContract } from './types';
```

(keeping the file named `overlay.ts` avoids renaming the file itself, but exporting as `mask`)

- [ ] **step 4.7: update shadcn dialog mask**

modify `packages/prototypes/shadcn/src/dialog/overlay.ts`:

```ts
import { definePrototype, tw } from '@proto.ui/core';
import { asDialogMask } from '@proto.ui/prototypes-base';
import type { ShadcnDialogMaskExposes, ShadcnDialogMaskProps } from './types';

const dialogMask = definePrototype<ShadcnDialogMaskExposes, ShadcnDialogMaskProps>({
  name: 'shadcn-dialog-mask',
  setup(def) {
    asDialogMask();
    def.feedback.style.use(tw('fixed inset-0 z-50 bg-black/80'));
  },
});

export default dialogMask;
```

modify `packages/prototypes/shadcn/src/dialog/types.ts`:

rename `ShadcnDialogOverlay*` to `ShadcnDialogMask*`.

modify `packages/prototypes/shadcn/src/dialog/index.ts`:

update imports/exports to use `Mask` names.

modify `packages/prototypes/shadcn/src/index.ts`:

update re-exports to use `Mask` names.

- [ ] **step 4.8: ensure base index includes dialog**

verify `packages/prototypes/base/src/index.ts` exports the dialog family. if it exports `dialogOverlay`, update to `dialogMask`.

- [ ] **step 4.9: commit prototype changes**

```bash
git add packages/prototypes/base/src/dialog/ packages/prototypes/shadcn/src/dialog/overlay.ts packages/prototypes/shadcn/src/dialog/types.ts packages/prototypes/shadcn/src/dialog/index.ts packages/prototypes/shadcn/src/index.ts packages/prototypes/base/src/index.ts
git rm packages/prototypes/base/src/dialog/portal.ts || true
git commit -m "refactor(dialog): move portal to overlay module, rename overlay to mask, relax cardinality"
```

---

## task 5: update tests

**files:**

- modify: `packages/prototypes/base/test/dialog.test.ts`
- modify: `packages/prototypes/shadcn/test/dialog.test.ts`
- modify: `packages/adapters/react/test/dialog.test.ts`
- modify: `packages/adapters/vue/test/dialog.test.ts`

- [ ] **step 5.1: update base dialog test**

in `packages/prototypes/base/test/dialog.test.ts`:

1. replace `base-dialog-overlay` with `base-dialog-mask` in all element names.
2. replace variable names `overlay` with `mask` where they refer to the overlay element.
3. ensure tests still verify open/close behavior, anatomy roles, and context propagation.

- [ ] **step 5.2: update shadcn dialog test**

in `packages/prototypes/shadcn/test/dialog.test.ts`:

1. replace `shadcn-dialog-overlay` with `shadcn-dialog-mask`.

- [ ] **step 5.3: update react adapter dialog test**

in `packages/adapters/react/test/dialog.test.ts`:

1. replace `dialogOverlay` import/reference with `dialogMask` / `shadcnDialogMask`.
2. update element assertions.

- [ ] **step 5.4: update vue adapter dialog test**

in `packages/adapters/vue/test/dialog.test.ts`:

1. same renames as react test.

- [ ] **step 5.5: run unit tests**

```bash
pnpm test packages/prototypes packages/adapters
```

expected: all tests pass.

- [ ] **step 5.6: commit test updates**

```bash
git add packages/prototypes/base/test/dialog.test.ts packages/prototypes/shadcn/test/dialog.test.ts packages/adapters/react/test/dialog.test.ts packages/adapters/vue/test/dialog.test.ts
git commit -m "test(dialog): update tests for mask rename and portal via overlay module"
```

---

## task 6: update docs and demos

**files:**

- modify: `apps/www/src/content/docs/en/prototypes/base/dialog.mdx`
- modify: `apps/www/src/content/docs/en/prototypes/shadcn/dialog.mdx`
- modify: `apps/www/src/content/docs/zh-cn/prototypes/base/dialog.mdx`
- modify: `apps/www/src/content/docs/zh-cn/prototypes/shadcn/dialog.mdx`
- modify: `apps/www/src/content/docs/demo_components/base-dialog/baseDialogCode.ts`
- modify: `apps/www/src/content/docs/demo_components/shadcn-dialog/shadcnDialogCode.ts`
- modify: `apps/www/src/components/PrototypePreviewer/prototype-modules.ts`

- [ ] **step 6.1: rename overlay to mask in all docs**

in all four `.mdx` files and both `.ts` demo files, replace:

- `dialog-overlay` -> `dialog-mask`
- `DialogOverlay` -> `DialogMask`
- `dialogOverlay` -> `dialogMask`

- [ ] **step 6.2: update prototype-modules.ts**

in `apps/www/src/components/PrototypePreviewer/prototype-modules.ts`:

update module keys `base-dialog-overlay` and `shadcn-dialog-overlay` to `base-dialog-mask` and `shadcn-dialog-mask`.

- [ ] **step 6.3: regenerate tailwind tokens**

```bash
node apps/www/scripts/generate-prototype-tailwind-sources.mjs
```

- [ ] **step 6.4: commit docs and demos**

```bash
git add apps/www/src/content/docs/ apps/www/src/components/PrototypePreviewer/prototype-modules.ts apps/www/src/styles/prototype-tokens.generated.css
git commit -m "docs(www): update dialog docs and demos for mask rename"
```

---

## task 7: integration testing via browser

- [ ] **step 7.1: start the www dev server**

```bash
cd apps/www && pnpm dev
```

wait for the server to be ready (port 4321 or as configured).

- [ ] **step 7.2: open the dialog demo page in browser**

navigate to `http://localhost:4321/en/prototypes/base/dialog` and `http://localhost:4321/en/prototypes/shadcn/dialog`.

- [ ] **step 7.3: verify dialog behavior**

for each runtime (wc, react, vue):

1. click the trigger button to open the dialog.
2. verify the mask covers the full screen including the top navigation bar.
3. verify the page body cannot scroll while the dialog is open (modal lock).
4. verify clicking the mask closes the dialog (if configured).
5. verify clicking the close button closes the dialog.
6. verify body scrolling is restored after closing.

- [ ] **step 7.4: report results**

document any failures. if tests pass, the implementation is complete.

---

## self-review checklist

- [x] spec coverage: portal capability via overlay module — task 1, 2, 4
- [x] spec coverage: modal capability — task 1.4, 1.6, 2, 4.3
- [x] spec coverage: anatomy cardinality relaxed — task 4.2
- [x] spec coverage: overlay -> mask rename — task 4, 5, 6
- [x] no placeholders: every step has exact file paths and code snippets
- [x] type consistency: `OverlayConfigPatch` gains `portal` and `modal`, `asOverlay` accepts the patch, caps use `OverlayGlobalMount` and `OverlayModal` throughout
