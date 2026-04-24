// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'check-check' as const;
export const LUCIDE_CHECK_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 6 7 17l-5-5' }),
  svg.path({ d: 'm22 10-7.5 7.5L13 16' }),
];

export function renderLucideCheckCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHECK_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-check-check-icon',
  prototypeName: 'lucide-check-check-icon',
  shapeFactory: LUCIDE_CHECK_CHECK_SHAPE_FACTORY,
});

export const asLucideCheckCheckIcon = fixed.asHook;
export const lucideCheckCheckIcon = fixed.prototype;
export default lucideCheckCheckIcon;
