import { setElementProps } from '@proto-ui/adapters.web-component';
import type { RuntimeAPI } from './registry';
import { ensurePreviewWcRegistered } from '../wc-registry';

export const runtime: RuntimeAPI = {
  id: 'wc',
  label: 'Web Components',

  async mount(host, prototype, options) {
    host.innerHTML = '';

    // 为预览器中的 WC 添加前缀，避免与其他 runtime 冲突
    const wcName = ensurePreviewWcRegistered(prototype.name, prototype as any);

    const el = document.createElement(wcName);
    // 传递 props
    if (options?.props) {
      setElementProps(el, options.props);
    }
    host.appendChild(el);
  },
  unmount(host) {
    host.innerHTML = '';
  },
};
