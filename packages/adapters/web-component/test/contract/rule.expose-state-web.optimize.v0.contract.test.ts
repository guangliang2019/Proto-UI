import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { tw } from '@proto-ui/core';
import { AdaptToWebComponent } from '../../src/adapt';

describe('adapter-web-component: rule expose-state-web optimization (v0)', () => {
  it('short-circuits to selector token when state is exposed and non-continuous', async () => {
    const proto: Prototype = {
      name: 'x-rule-esw-opt',
      setup(def: any) {
        const disabled = def.state.bool('btn.disabled', false);
        def.expose('disabled', disabled);

        def.rule({
          when: (w: any) => w.state(disabled).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        def.lifecycle.onMounted(() => {
          disabled.set(true);
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    // selector-style token should be present (setup-time optimization)
    expect(el.classList.contains('data-[btn-disabled]:opacity-50'), el.className).toBe(true);
    // runtime plain token should not be used
    expect(el.classList.contains('opacity-50')).toBe(false);

    // expose-state-web should still toggle attr
    expect(el.getAttribute('data-btn-disabled')).toBe('');

    document.body.removeChild(el);
  });

  it('does not optimize when state is continuous number (number.range)', async () => {
    const proto: Prototype = {
      name: 'x-rule-esw-range',
      setup(def: any) {
        const value = def.state.numberRange('slider.value', 0.5, {
          min: 0,
          max: 1,
        });
        def.expose('value', value);

        def.rule({
          when: (w: any) => w.state(value).eq(0.5),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    // fallback to runtime style token
    expect(el.classList.contains('opacity-50')).toBe(true);
    // no selector token for continuous number
    expect(el.classList.contains('data-[slider-value=0.5]:opacity-50')).toBe(false);

    document.body.removeChild(el);
  });

  it('optimizes state+meta(colorScheme=dark) rule into dark:* selector tokens', async () => {
    const proto: Prototype = {
      name: 'x-rule-meta-dark-opt',
      setup(def: any) {
        const disabled = def.state.bool('btn.disabled', false);
        def.expose('disabled', disabled);

        def.rule({
          when: (w: any) => w.all(w.state(disabled).eq(true), w.meta('colorScheme').eq('dark')),
          intent: (i: any) => i.feedback.style.use(tw('bg-zinc-950')),
        });

        def.lifecycle.onMounted(() => {
          disabled.set(true);
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('data-[btn-disabled]:dark:bg-zinc-950'), el.className).toBe(true);
    expect(el.classList.contains('bg-zinc-950')).toBe(false);

    document.body.removeChild(el);
  });

  it('maps supported official semantics to standard web variants', async () => {
    const proto: Prototype = {
      name: 'x-rule-esw-semantic-opt',
      setup(def: any) {
        const hovered = def.state.fromInteraction('hovered');
        const pressed = def.state.fromInteraction('pressed');
        const invalid = def.state.fromAccessibility('invalid');

        def.expose('hovered', hovered);
        def.expose('pressed', pressed);
        def.expose('invalid', invalid);

        def.rule({
          when: (w: any) => w.state(hovered).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });
        def.rule({
          when: (w: any) => w.state(pressed).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('ring-2')),
        });
        def.rule({
          when: (w: any) => w.state(invalid).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('border-destructive')),
        });

        def.lifecycle.onMounted(() => {
          hovered.set(true);
          pressed.set(true);
          invalid.set(true);
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('hover:opacity-50'), el.className).toBe(true);
    expect(el.classList.contains('active:ring-2'), el.className).toBe(true);
    expect(el.classList.contains('aria-invalid:border-destructive'), el.className).toBe(true);

    document.body.removeChild(el);
  });

  it('can fall back to data-* selectors when host policy disallows native variants', async () => {
    const proto: Prototype = {
      name: 'x-rule-esw-semantic-fallback',
      setup(def: any) {
        const disabled = def.state.fromInteraction('disabled');
        const focusVisible = def.state.fromInteraction('focusVisible');

        def.expose('disabled', disabled);
        def.expose('focusVisible', focusVisible);

        def.rule({
          when: (w: any) => w.state(disabled).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });
        def.rule({
          when: (w: any) => w.state(focusVisible).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('ring-2')),
        });

        def.lifecycle.onMounted(() => {
          disabled.set(true);
          focusVisible.set(true);
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const El = AdaptToWebComponent(proto);
    const el = new El();
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('data-[disabled]:opacity-50'), el.className).toBe(true);
    expect(el.classList.contains('data-[focus-visible]:ring-2'), el.className).toBe(true);
    expect(el.classList.contains('disabled:opacity-50'), el.className).toBe(false);
    expect(el.classList.contains('focus-visible:ring-2'), el.className).toBe(false);

    document.body.removeChild(el);
  });
});
