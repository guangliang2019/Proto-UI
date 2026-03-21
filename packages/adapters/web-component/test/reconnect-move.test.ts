import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent } from '../src/adapt';
import { definePrototype, tw } from '@proto-ui/core';

describe('adapter-web-component: intra-document move', () => {
  it('does not dispose a mounted custom element when it is synchronously moved within the document', async () => {
    const proto = definePrototype({
      name: 'x-move-stable-style',
      setup(def) {
        def.feedback.style.use(tw('inline-flex rounded-lg'));
        return (r) => r.el('div', r.r.slot());
      },
    });

    AdaptToWebComponent(proto as any);

    const hostA = document.createElement('div');
    const hostB = document.createElement('div');
    document.body.appendChild(hostA);
    document.body.appendChild(hostB);

    const el = document.createElement('x-move-stable-style') as HTMLElement;
    hostA.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('inline-flex')).toBe(true);
    expect(el.classList.contains('rounded-lg')).toBe(true);

    hostB.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('inline-flex')).toBe(true);
    expect(el.classList.contains('rounded-lg')).toBe(true);

    hostA.remove();
    hostB.remove();
  });
});
