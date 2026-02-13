import { definePrototype, tw } from '@proto-ui/core';
import { registerPrototype } from '../../../components/PrototypePreviewer/registry';

const DemoInline = definePrototype({
  name: 'demo-inline',
  setup(def) {
    // 设置基础样式
    def.feedback.style.use(tw('bg-gray-200 text-gray-800 p-2'));
    // 设置覆盖样式（部分覆盖）
    def.feedback.style.use(tw('bg-red-500 text-white'));

    // 设置补充样式
    def.feedback.style.use(tw('p-4 rounded border'));

    return (r) => {
      return r.el('div', { style: tw('text-white') }, 'Hello World');
      // return '123';
      // return 'hello world';
    };
  },
});

registerPrototype('demo-inline', DemoInline);
