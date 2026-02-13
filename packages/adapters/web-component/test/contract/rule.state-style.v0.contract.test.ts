import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { tw } from '@proto-ui/core';
import { AdaptToWebComponent } from '../../src/adapt';

// NOTE: this test exercises rule.when(state) -> feedback.style via adapter.

describe('adapter-web-component: rule state -> style (v0)', () => {
  it('applies rule style on state change and removes it on deactivate', async () => {
    const proto: Prototype = {
      name: 'rule-state-style-wc',
      setup(def: any) {
        const pressed = def.state.bool('pressed', false);

        def.rule({
          when: (w: any) => w.state(pressed).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        def.lifecycle.onUpdated(() => {
          // toggle on each update to exercise rule apply/unapply
          pressed.set(!pressed.get());
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    // allow initial mount to complete
    await Promise.resolve();
    await Promise.resolve();

    // trigger update -> onUpdated runs -> state true -> rule use
    (el as any).update();
    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('opacity-50')).toBe(true);

    // trigger update -> onUpdated runs -> state false -> rule unUse
    (el as any).update();
    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('opacity-50')).toBe(false);

    document.body.removeChild(el);
  });
});
