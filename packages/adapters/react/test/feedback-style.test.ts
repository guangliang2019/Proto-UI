import { describe, expect, it } from 'vitest';
import { tw, type Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: feedback style', () => {
  it('applies feedback tokens onto host root and preserves user classes', () => {
    const proto: Prototype = {
      name: 'react-feedback-style',
      setup(def) {
        def.feedback.style.use(tw('opacity-50 bg-red-500'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto, {
      hostClassName: 'user-a',
    });

    expect(mounted.root?.classList.contains('user-a')).toBe(true);
    expect(mounted.root?.classList.contains('opacity-50')).toBe(true);
    expect(mounted.root?.classList.contains('bg-red-500')).toBe(true);

    mounted.unmount();
  });
});
