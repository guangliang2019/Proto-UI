import { definePrototype, tw } from '@proto-ui/core';

const DemoInline = definePrototype({
  name: 'demo-inline',
  setup(def) {
    // 设置基础样式
    def.feedback.style.use(tw('bg-gray-200 text-gray-800 p-2'));
    // 设置覆盖样式（部分覆盖）
    def.feedback.style.use(tw('bg-red-500 text-white'));

    // 设置补充样式
    def.feedback.style.use(tw('p-4 rounded border'));

    def.props.define({
      label: { type: 'string', default: 'Hello' },
    });

    return (r) => {
      return r.r.slot();
    };
  },
});

export default DemoInline;
