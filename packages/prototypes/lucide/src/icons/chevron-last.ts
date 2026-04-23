// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevron-last' as const;
export const LUCIDE_CHEVRON_LAST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 18 6-6-6-6' }),
  svg.path({ d: 'M17 6v12' }),
];

export function renderLucideChevronLastIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRON_LAST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevron-last-icon',
  prototypeName: 'lucide-chevron-last-icon',
  shapeFactory: LUCIDE_CHEVRON_LAST_SHAPE_FACTORY,
});

export const asLucideChevronLastIcon = fixed.asHook;
export const lucideChevronLastIcon = fixed.prototype;
export default lucideChevronLastIcon;
