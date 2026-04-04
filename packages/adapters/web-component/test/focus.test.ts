import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';
import { asFocusScope } from '@proto.ui/hooks';
import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';
import { asButton } from '../../../prototypes/base/src/button';

describe('adapter-web-component focus wiring', () => {
  it('makes asButton host focusable and syncs focus/blur to exposes', () => {
    const P = definePrototype({
      name: 'x-focusable-button',
      setup() {
        asButton();
        return (r) => [r.el('button', 'ok')];
      },
    });

    AdaptToWebComponent(P as any);

    const el = document.createElement('x-focusable-button') as any;
    document.body.appendChild(el);

    expect(el.tabIndex).toBe(0);

    const exposes = el.getExposes();
    expect(exposes.focused.get()).toBe(false);

    el.focus();
    expect(exposes.focused.get()).toBe(true);

    el.blur();
    expect(exposes.focused.get()).toBe(false);
  });

  it('does not make focus-scope-only host focusable', () => {
    const P = definePrototype({
      name: 'x-focus-scope-only',
      setup() {
        asFocusScope({ emptyPolicy: 'container' });
        return (r) => [r.el('div', 'ok')];
      },
    });

    AdaptToWebComponent(P as any);

    const el = document.createElement('x-focus-scope-only') as any;
    document.body.appendChild(el);

    expect(el.tabIndex).toBe(-1);
    expect(document.activeElement).not.toBe(el);
  });
});
