// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevron-left' as const;
export const LUCIDE_CHEVRON_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'm15 18-6-6 6-6' });

export function renderLucideChevronLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRON_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevron-left-icon',
  prototypeName: 'lucide-chevron-left-icon',
  shapeFactory: LUCIDE_CHEVRON_LEFT_SHAPE_FACTORY,
});

export const asLucideChevronLeftIcon = fixed.asHook;
export const lucideChevronLeftIcon = fixed.prototype;
export default lucideChevronLeftIcon;
