// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'check' as const;
export const LUCIDE_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M20 6 9 17l-5-5' });

export function renderLucideCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-check-icon',
  prototypeName: 'lucide-check-icon',
  shapeFactory: LUCIDE_CHECK_SHAPE_FACTORY,
});

export const asLucideCheckIcon = fixed.asHook;
export const lucideCheckIcon = fixed.prototype;
export default lucideCheckIcon;
