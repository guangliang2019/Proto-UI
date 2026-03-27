import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: events', () => {
  it('delivers native click via the adapter root target', () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'react-event-native-click',
      setup(def: any) {
        def.event.on('native:click', () => calls.push('native:click'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedReactAdapter(proto);

    mounted.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['native:click']);

    mounted.unmount();
  });

  it('disables native events after unmount', () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'react-event-after-unmount',
      setup(def: any) {
        def.event.on('press.commit', () => calls.push('press.commit'));
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedReactAdapter(proto);

    mounted.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit']);

    const root = mounted.root;
    mounted.unmount();

    root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit', 'unmounted']);
  });
});
