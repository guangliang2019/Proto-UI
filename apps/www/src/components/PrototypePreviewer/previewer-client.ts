// src/next-www/src/components/PrototypePreviewer/previewer-client.ts
import { runtimeLoaders } from './runtimes/registry';
import { getPrototype } from './registry';
import { loadPrototype } from './prototype-modules';
import type { RuntimeId } from './runtimes/registry';

interface PreviewerOptions {
  root: HTMLElement;
  prototypeId: string;
  initialRuntime: RuntimeId;
  demoProps: Record<string, unknown>;
  runtimeList: RuntimeId[];
  loader?: string; // 动态导入路径
}

export function initPreviewer(options: PreviewerOptions) {
  const { root, prototypeId, initialRuntime, demoProps, runtimeList, loader } = options;

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

  // 动态加载原型模块
  let loaderPromise: Promise<void> | null = null;
  async function ensurePrototypeLoaded() {
    if (loaderPromise) return loaderPromise; // 已在加载中
    
    loaderPromise = (async () => {
      try {
        // 方式1：使用自定义 loader（废弃的旧方式，保留兼容）
        if (loader) {
          const baseUrl = import.meta.url.replace(/\/[^/]+$/, '/');
          const modulePath = new URL(loader, baseUrl).href;
          await import(/* @vite-ignore */ modulePath);
          return;
        }
        
        // 方式2：自动按需加载（推荐）
        await loadPrototype(prototypeId);
      } catch (err) {
        console.error('[PrototypePreviewer] 加载原型模块失败:', prototypeId, err);
        throw err;
      }
    })();
    
    return loaderPromise;
  }

  async function switchTo(id: string, retryCount = 0) {
    if (destroyed) return;
    const myVersion = ++version;
    if (select) select.disabled = true;

    try {
      // 卸载旧 runtime
      if (current?.api?.unmount) await current.api.unmount(host);
      else host.innerHTML = '';

      // 确保原型已加载（如果有 loader）
      await ensurePrototypeLoaded();

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
      // 如果是原型未找到的错误，不需要重试（动态加载应该已经处理了）
      // 旧的重试逻辑已被更可靠的动态加载机制取代
      
      // 显示错误信息
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
