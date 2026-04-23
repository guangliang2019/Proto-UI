// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevron-right' as const;
export const LUCIDE_CHEVRON_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'm9 18 6-6-6-6' });

export function renderLucideChevronRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRON_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevron-right-icon',
  prototypeName: 'lucide-chevron-right-icon',
  shapeFactory: LUCIDE_CHEVRON_RIGHT_SHAPE_FACTORY,
});

export const asLucideChevronRightIcon = fixed.asHook;
export const lucideChevronRightIcon = fixed.prototype;
export default lucideChevronRightIcon;
