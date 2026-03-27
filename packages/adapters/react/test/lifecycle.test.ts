import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: lifecycle', () => {
  it('created runs before mounted and unmounted runs on teardown', () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'react-life-basic',
      setup(def) {
        def.lifecycle.onCreated(() => calls.push('created'));
        def.lifecycle.onMounted(() => calls.push('mounted'));
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    expect(calls.slice(0, 2)).toEqual(['created', 'mounted']);

    mounted.unmount();

    expect(calls.includes('unmounted')).toBe(true);
  });
});
