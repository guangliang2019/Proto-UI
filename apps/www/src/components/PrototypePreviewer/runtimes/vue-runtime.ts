import type { RuntimeAPI } from './registry';
import { createVueAdapter } from '@proto-ui/adapters.vue';
import type * as VueTypes from 'vue';

// 使用 esm.sh 的 ESM 版本懒加载 Vue
// 也可以替换成本地的 "vue"
const VUE_SOURCE = 'https://esm.sh/vue@3';

// 异步加载 Vue
export async function loadVue(): Promise<typeof VueTypes> {
  // const Vue = await import(/* @vite-ignore */ VUE_SOURCE) as Promise<typeof VueTypes>
  const Vue = (await import(/* @vite-ignore */ VUE_SOURCE)) as typeof VueTypes;
  return Vue;
}

// 保存各宿主节点对应的 Vue app 实例（避免重复创建）
type VueApp = {
  unmount: () => void;
};

const vueApps = new WeakMap<HTMLElement, VueApp>();

/**
 * Vue 运行时实现：
 * - 懒加载 Vue 依赖
 * - 使用 Proto UI 的 createVueAdapter() 适配 Prototype
 * - 维护宿主 app 的 mount / unmount 生命周期
 */
export const runtime: RuntimeAPI = {
  id: 'vue',
  label: 'Vue',

  async mount(host, prototype, options) {
    // 防止重复渲染
    const existingApp = vueApps.get(host);
    if (existingApp) {
      existingApp.unmount();
      vueApps.delete(host);
    }

    // 确保容器干净
    host.innerHTML = '';
    const Vue = await loadVue();

    // 通过适配器获得 Vue 组件
    const Component = createVueAdapter(Vue)(prototype);

    // 创建 Vue 应用实例
    const app = Vue.createApp(Component, options?.props ?? {});

    // 挂载到宿主元素
    app.mount(host);

    // 保存 app 实例
    vueApps.set(host, app);
  },

  async unmount(host) {
    const app = vueApps.get(host);
    if (app) {
      app.unmount();
      vueApps.delete(host);
    }
    host.innerHTML = '';
  },
};
