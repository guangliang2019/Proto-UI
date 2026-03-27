import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

function getAttr(el: Element | null, name: string) {
  return el?.getAttribute(name) ?? null;
}

function getVar(el: HTMLElement | null, name: string) {
  return el?.style.getPropertyValue(name) ?? '';
}

describe('adapter-react: expose-state-web', () => {
  it('maps bool to data-attr only', () => {
    const proto: Prototype = {
      name: 'react-esw-bool',
      setup(def) {
        const s = def.state.bool('btn.disabled', false);
        def.expose('disabled', s);
        def.lifecycle.onMounted(() => s.set(true));
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    expect(getAttr(mounted.root, 'data-btn-disabled')).toBe('');
    expect(getVar(mounted.root, '--pui-btn-disabled')).toBe('');

    mounted.unmount();
  });

  it('maps enum to data-attr only', () => {
    const proto: Prototype = {
      name: 'react-esw-enum',
      setup(def) {
        const s = def.state.enum('btn.size', 'md', { options: ['sm', 'md', 'lg'] });
        def.expose('size', s);
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    expect(getAttr(mounted.root, 'data-btn-size')).toBe('md');
    expect(getVar(mounted.root, '--pui-btn-size')).toBe('');

    mounted.unmount();
  });

  it('maps number.discrete to attr + css var', () => {
    const proto: Prototype = {
      name: 'react-esw-disc',
      setup(def) {
        const s = def.state.numberDiscrete('list.index', 3);
        def.expose('index', s);
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    expect(getAttr(mounted.root, 'data-list-index')).toBe('3');
    expect(getVar(mounted.root, '--pui-list-index')).toBe('3');

    mounted.unmount();
  });

  it('maps number.range to css var only', () => {
    const proto: Prototype = {
      name: 'react-esw-range',
      setup(def) {
        const s = def.state.numberRange('slider.value', 0.5, { min: 0, max: 1 });
        def.expose('value', s);
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    expect(getAttr(mounted.root, 'data-slider-value')).toBe(null);
    expect(getVar(mounted.root, '--pui-slider-value')).toBe('0.5');

    mounted.unmount();
  });

  it('allows mode overrides for string var + continuous attr', () => {
    const proto: Prototype = {
      name: 'react-esw-mode',
      setup(def) {
        const s1 = def.state.string('mode.label', 'hi');
        const s2 = def.state.numberRange('mode.value', 0.2, { min: 0, max: 1 });
        def.expose('label', s1);
        def.expose('value', s2);
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(
      proto,
      {},
      {
        exposeStateWebMode: {
          allowStringVar: true,
          allowContinuousAttr: true,
        },
      }
    );

    expect(getAttr(mounted.root, 'data-mode-label')).toBe('hi');
    expect(getVar(mounted.root, '--pui-mode-label')).toBe('hi');
    expect(getAttr(mounted.root, 'data-mode-value')).toBe('0.2');
    expect(getVar(mounted.root, '--pui-mode-value')).toBe('0.2');

    mounted.unmount();
  });

  it('sanitizes official semantic names and reflects accessibility attrs', () => {
    const proto: Prototype = {
      name: 'react-esw-official',
      setup(def) {
        const hovered = def.state.fromInteraction('hovered');
        const checked = def.state.fromAccessibility('checked');
        def.expose('hovered', hovered);
        def.expose('checked', checked);
        def.lifecycle.onMounted(() => {
          hovered.set(true);
          checked.set(true);
        });
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    const names = mounted.root?.getAttributeNames() ?? [];
    expect(names.includes('data--interaction-hovered')).toBe(false);
    expect(names.some((name) => /^data-.*hovered$/.test(name))).toBe(true);
    expect(getAttr(mounted.root, 'data-checked')).toBe('');
    expect(getAttr(mounted.root, 'aria-checked')).toBe('true');

    mounted.unmount();
  });
});
