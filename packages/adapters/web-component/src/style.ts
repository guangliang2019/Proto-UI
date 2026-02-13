// packages/adapters/web-component/src/style.ts
import type { TemplateStyleHandle } from '@proto-ui/core';

export type TwResolver = (tokens: string) => string; // returns cssText for v0

let twResolver: TwResolver | null = null;

export function configureTemplateStyle(opt: { tw?: TwResolver }) {
  twResolver = opt.tw ?? null;
}

export function applyTemplateStyle(el: Element, style?: TemplateStyleHandle) {
  if (!style) return;

  if (style.kind === 'css') {
    const cssText = style.cssText?.trim();
    if (!cssText) return;
    // v0: inline style as IR carrier
    (el as HTMLElement).setAttribute('style', cssText);
    return;
  }

  if (style.kind === 'tw') {
    if (!twResolver) return; // v0: ignore if not configured
    const cssText = twResolver(style.tokens);
    if (cssText) (el as HTMLElement).setAttribute('style', cssText);
  }
}
