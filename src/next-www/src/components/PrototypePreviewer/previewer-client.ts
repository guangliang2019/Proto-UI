// src/next-www/src/components/PrototypePreviewer/previewer-client.ts
import { runtimeLoaders } from './runtimes/registry';
import { getPrototype } from './registry';
import type { RuntimeId } from './runtimes/registry';

interface PreviewerOptions {
  root: HTMLElement;
  prototypeId: string;
  initialRuntime: RuntimeId;
  demoProps: Record<string, unknown>;
  runtimeList: RuntimeId[];
}

export function initPreviewer(options: PreviewerOptions) {
  const { root, prototypeId, initialRuntime, demoProps, runtimeList } = options;

  // 防重复初始化
  if (root.dataset.inited === '1') {
    console.warn('[PrototypePreviewer] already initialized:', root.dataset.previewerId);
    return;
  }
  root.dataset.inited = '1';

  const host = root.querySelector('.host') as HTMLElement;
  const select = root.querySelector('select') as HTMLSelectElement | null;

  let current: { id: string; api: any } | null = null;
  let version = 0;
  let destroyed = false;

  // 初始化下拉
  if (select) {
    select.innerHTML = '';
    for (const id of runtimeList) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent =
        (
          {
            wc: 'Web Components',
            react: 'React',
            vue: 'Vue',
          } as Record<string, string>
        )[id] || id;
      if (id === initialRuntime) opt.selected = true;
      select.appendChild(opt);
    }
  }

  function dispatch(name: string, detail: any) {
    root.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
  }

  async function switchTo(id: string) {
    if (destroyed) return;
    const myVersion = ++version;
    if (select) select.disabled = true;

    try {
      // 卸载旧 runtime
      if (current?.api?.unmount) await current.api.unmount(host);
      else host.innerHTML = '';

      // 并行加载：运行时 API + 原型对象引用
      const [api, proto] = await Promise.all([
        runtimeLoaders[id as RuntimeId](),
        Promise.resolve().then(() => getPrototype(prototypeId)),
      ]);

      // 竞态保护
      if (myVersion !== version || destroyed) return;

      await api.mount(host, proto, { props: demoProps });
      current = { id, api };
      dispatch('runtime:changed', { id });
    } catch (err) {
      host.innerHTML = '';
      const pre = document.createElement('pre');
      pre.textContent =
        '[Preview Error]\n' + (err && ((err as any).stack || (err as any).message || String(err)));
      pre.style.whiteSpace = 'pre-wrap';
      pre.style.color = 'crimson';
      host.appendChild(pre);
      console.error(err);
      dispatch('error', { error: err });
    } finally {
      if (myVersion === version && !destroyed && select) select.disabled = false;
    }
  }

  // 首次挂载（统一走 runtime 生命周期，避免 WC 单走一套）
  switchTo(initialRuntime).then(() => dispatch('previewer:mounted', { runtime: initialRuntime }));

  // 切换事件
  if (select) select.addEventListener('change', () => switchTo(select.value));

  // 对外控制（调试/父组件可用）
  (root as any).__previewer__ = {
    switchRuntime: (id: string) => switchTo(id),
    reload: () => current && switchTo(current.id),
    getCurrentRuntime: () => current?.id ?? null,
    setProps: (nextProps: Record<string, unknown>) => {
      Object.assign(demoProps, nextProps || {});
      if (current) switchTo(current.id);
    },
    destroy: async () => {
      destroyed = true;
      version++;
      if (current?.api?.unmount) await current.api.unmount(host);
      host.innerHTML = '';
      current = null;
    },
  };

  // 组件卸载守护（如果父层会移除节点）
  const ro = new MutationObserver(() => {
    if (!document.body.contains(root)) {
      (root as any).__previewer__?.destroy?.();
      ro.disconnect();
    }
  });
  ro.observe(document.body, { childList: true, subtree: true });
}

import { definePrototype } from '@/core';
import { registerPrototype } from './registry';

const DemoInline = definePrototype({
  name: 'demo-inline',
  setup(p) {
    return (h) => {
      const r = (h as any).createElement ? (h as any).createElement : h;
      return r('div', { class: 'text-red-500' }, 'Hello World');
    };
  },
});

registerPrototype('demo-inline', DemoInline);
