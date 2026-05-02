// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'check-line' as const;
export const LUCIDE_CHECK_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 4L9 15' }),
  svg.path({ d: 'M21 19L3 19' }),
  svg.path({ d: 'M9 15L4 10' }),
];

export function renderLucideCheckLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHECK_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-check-line-icon',
  prototypeName: 'lucide-check-line-icon',
  shapeFactory: LUCIDE_CHECK_LINE_SHAPE_FACTORY,
});

export const asLucideCheckLineIcon = fixed.asHook;
export const lucideCheckLineIcon = fixed.prototype;
export default lucideCheckLineIcon;
