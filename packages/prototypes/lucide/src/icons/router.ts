// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'router' as const;
export const LUCIDE_ROUTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 8, x: 2, y: 14, rx: 2 }),
  svg.path({ d: 'M6.01 18H6' }),
  svg.path({ d: 'M10.01 18H10' }),
  svg.path({ d: 'M15 10v4' }),
  svg.path({ d: 'M17.84 7.17a4 4 0 0 0-5.66 0' }),
  svg.path({ d: 'M20.66 4.34a8 8 0 0 0-11.31 0' }),
];

export function renderLucideRouterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROUTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-router-icon',
  prototypeName: 'lucide-router-icon',
  shapeFactory: LUCIDE_ROUTER_SHAPE_FACTORY,
});

export const asLucideRouterIcon = fixed.asHook;
export const lucideRouterIcon = fixed.prototype;
export default lucideRouterIcon;
