// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rocket' as const;
export const LUCIDE_ROCKET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' }),
  svg.path({
    d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09',
  }),
  svg.path({
    d: 'M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z',
  }),
  svg.path({ d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05' }),
];

export function renderLucideRocketIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROCKET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rocket-icon',
  prototypeName: 'lucide-rocket-icon',
  shapeFactory: LUCIDE_ROCKET_SHAPE_FACTORY,
});

export const asLucideRocketIcon = fixed.asHook;
export const lucideRocketIcon = fixed.prototype;
export default lucideRocketIcon;
