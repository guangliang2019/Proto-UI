import { describe, expect, it } from 'vitest';
import { tw, type Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: rule props -> style', () => {
  it('applies rule style on prop change and removes it on deactivate', () => {
    const proto: Prototype<{ active?: boolean }> = {
      name: 'react-rule-props-style',
      setup(def: any) {
        def.props.define({
          active: { type: 'boolean', default: false },
        });

        def.rule({
          when: (w: any) => w.prop('active').eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const mounted = createMountedReactAdapter(proto, { active: false });

    expect(mounted.root?.classList.contains('opacity-50')).toBe(false);

    mounted.update({ active: true });
    expect(mounted.root?.classList.contains('opacity-50')).toBe(true);

    mounted.update({ active: false });
    expect(mounted.root?.classList.contains('opacity-50')).toBe(false);

    mounted.unmount();
  });
});
