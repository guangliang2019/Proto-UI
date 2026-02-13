import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { tw } from '@proto-ui/core';
import { AdaptToWebComponent } from '../../src/adapt';

describe('adapter-web-component: feedback.style.apply-to-host v0', () => {
  it('applies setup-time feedback tokens onto custom element host and preserves user classes', () => {
    const proto: Prototype = {
      name: 'test-feedback-apply-to-host-v0',
      setup(def: any) {
        def.feedback.style.use(tw('opacity-50 bg-red-500'));
        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);

    const el = new El();
    el.className = 'user-a';
    document.body.appendChild(el);

    expect(el.classList.contains('user-a')).toBe(true);
    expect(el.classList.contains('opacity-50')).toBe(true);
    expect(el.classList.contains('bg-red-500')).toBe(true);

    // disconnect should clear adapter-owned feedback tokens (but keep user class)
    document.body.removeChild(el);
    expect(el.classList.contains('user-a')).toBe(true);
    expect(el.classList.contains('opacity-50')).toBe(false);
    expect(el.classList.contains('bg-red-500')).toBe(false);
  });
});
