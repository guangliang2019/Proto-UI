import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: slots', () => {
  it('maps slot() to React children', () => {
    const proto: Prototype = {
      name: 'react-slot-basic',
      setup() {
        return (r) => [r.el('div', [r.slot()])];
      },
    };

    const mounted = createMountedReactAdapter(proto, {
      children: {
        type: 'span',
        props: { className: 'inner' },
        children: ['hello'],
      },
    });

    expect(mounted.root?.querySelector('.inner')?.textContent).toBe('hello');

    mounted.unmount();
  });
});
