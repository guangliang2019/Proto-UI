import { describe, expect, it } from 'vitest';
import { tw } from '@proto.ui/core';

import { AdaptToWebComponent } from '../src/adapt';

describe('adapter-web-component: host display', () => {
  it('injects a low-specificity block display rule and default host class', async () => {
    const tag = 'x-host-display-default';

    AdaptToWebComponent({
      name: tag,
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    });

    const el = document.createElement(tag);
    document.body.appendChild(el);
    await Promise.resolve();

    const styleEl = document.getElementById('proto-ui-wc-host-display') as HTMLStyleElement | null;
    expect(styleEl).not.toBeNull();
    expect(styleEl?.textContent).toContain(`:where(.pui-host-root) { display: block; }`);
    expect(el.classList.contains('pui-host-root')).toBe(true);
  });

  it('does not force block when author provides a class-based display utility', async () => {
    const tag = 'x-host-display-class';

    AdaptToWebComponent({
      name: tag,
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    });

    const authorStyle = document.createElement('style');
    authorStyle.textContent = `.inline { display: inline; }`;
    document.head.appendChild(authorStyle);

    const el = document.createElement(tag);
    el.className = 'inline';
    document.body.appendChild(el);
    await Promise.resolve();

    expect(getComputedStyle(el).display).toBe('inline');
    expect(el.classList.contains('pui-host-root')).toBe(false);

    authorStyle.remove();
  });

  it('keeps the default host display class when feedback adds non-display utility classes', async () => {
    const tag = 'x-host-display-feedback-non-display';

    AdaptToWebComponent({
      name: tag,
      setup(def) {
        def.feedback.style.use(tw('rounded bg-red-500 text-white'));
        return (r) => [r.el('div', 'ok')];
      },
    });

    const el = document.createElement(tag);
    document.body.appendChild(el);
    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('rounded')).toBe(true);
    expect(el.classList.contains('bg-red-500')).toBe(true);
    expect(el.classList.contains('pui-host-root')).toBe(true);
  });

  it('removes the default host display class when feedback adds a display utility class', async () => {
    const tag = 'x-host-display-feedback-display';

    AdaptToWebComponent({
      name: tag,
      setup(def) {
        def.feedback.style.use(tw('inline-flex rounded'));
        return (r) => [r.el('div', 'ok')];
      },
    });

    const el = document.createElement(tag);
    document.body.appendChild(el);
    await Promise.resolve();
    await Promise.resolve();

    expect(el.classList.contains('inline-flex')).toBe(true);
    expect(el.classList.contains('pui-host-root')).toBe(false);
  });
});
