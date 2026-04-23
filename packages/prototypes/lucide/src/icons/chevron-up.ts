// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevron-up' as const;
export const LUCIDE_CHEVRON_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'm18 15-6-6-6 6' });

export function renderLucideChevronUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRON_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevron-up-icon',
  prototypeName: 'lucide-chevron-up-icon',
  shapeFactory: LUCIDE_CHEVRON_UP_SHAPE_FACTORY,
});

export const asLucideChevronUpIcon = fixed.asHook;
export const lucideChevronUpIcon = fixed.prototype;
export default lucideChevronUpIcon;
