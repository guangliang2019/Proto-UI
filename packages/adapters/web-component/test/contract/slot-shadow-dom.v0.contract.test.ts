import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

describe('contract: adapter-web-component / slot shadow-dom (v0)', () => {
  it('shadow=true: slot renders as real <slot>', () => {
    const P: Prototype = {
      name: 'x-contract-shadow-slot-1',
      setup() {
        return (r) => [r.r.slot()];
      },
    };

    AdaptToWebComponent(P, { shadow: true });

    const el = document.createElement('x-contract-shadow-slot-1') as any;
    document.body.appendChild(el);

    expect(el.shadowRoot?.innerHTML).toBe('<slot></slot>');
  });
});
