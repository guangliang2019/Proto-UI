import { definePrototype } from '@/core';
import { registerPrototype } from '../../../components/PrototypePreviewer/registry';


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