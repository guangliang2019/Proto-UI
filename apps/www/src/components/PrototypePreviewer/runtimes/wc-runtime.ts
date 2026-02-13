import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';
import type { RuntimeAPI } from './registry';

export const runtime: RuntimeAPI = {
  id: 'wc',
  label: 'Web Components',

  async mount(host, prototype, options) {
    host.innerHTML = '';

    // 为预览器中的 WC 添加前缀，避免与其他 runtime 冲突
    const wcName = `wc-${prototype.name}`;

    // 检查是否已注册，避免重复注册导致错误
    if (!customElements.get(wcName)) {
      // 创建一个带前缀的原型副本
      const prefixedProto = {
        ...prototype,
        name: wcName,
      };
      AdaptToWebComponent(prefixedProto);
    }

    const el = document.createElement(wcName);
    // 传递 props
    if (options?.props) {
      Object.assign(el, options.props);
    }
    host.appendChild(el);
  },
  unmount(host) {
    host.innerHTML = '';
  },
};
