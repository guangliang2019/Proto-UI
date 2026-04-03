import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: event routing', () => {
  it('maps Enter keydown within the adapter root to press.commit and key.down', () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'react-event-key-routing',
      setup(def: any) {
        def.event.onGlobal('key.down', () => calls.push('key.down'));
        def.event.on('press.commit', () => calls.push('press.commit'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedReactAdapter(proto);

    mounted.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(calls).toEqual(['press.commit', 'key.down']);

    mounted.unmount();
  });
});
