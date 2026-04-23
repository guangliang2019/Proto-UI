// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cookie' as const;
export const LUCIDE_COOKIE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5' }),
  svg.path({ d: 'M8.5 8.5v.01' }),
  svg.path({ d: 'M16 15.5v.01' }),
  svg.path({ d: 'M12 12v.01' }),
  svg.path({ d: 'M11 17v.01' }),
  svg.path({ d: 'M7 14v.01' }),
];

export function renderLucideCookieIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COOKIE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cookie-icon',
  prototypeName: 'lucide-cookie-icon',
  shapeFactory: LUCIDE_COOKIE_SHAPE_FACTORY,
});

export const asLucideCookieIcon = fixed.asHook;
export const lucideCookieIcon = fixed.prototype;
export default lucideCookieIcon;
