import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

describe('adapter-web-component expose wiring', () => {
  it('provides getExposes() for App Maker and wires expose sink', () => {
    const P: Prototype = {
      name: 'x-expose',
      setup(def) {
        def.expose('api', {
          ping: () => 'pong',
          version: 1,
        });
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-expose') as any;
    document.body.appendChild(el);

    const exposes = el.getExposes?.();
    expect(exposes).toBeTruthy();
    expect(exposes.api).toBeTruthy();
    expect(typeof exposes.api.ping).toBe('function');
    expect(exposes.api.ping()).toBe('pong');
    expect(exposes.api.version).toBe(1);
  });
});
