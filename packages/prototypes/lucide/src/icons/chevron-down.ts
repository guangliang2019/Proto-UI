// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevron-down' as const;
export const LUCIDE_CHEVRON_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'm6 9 6 6 6-6' });

export function renderLucideChevronDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRON_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevron-down-icon',
  prototypeName: 'lucide-chevron-down-icon',
  shapeFactory: LUCIDE_CHEVRON_DOWN_SHAPE_FACTORY,
});

export const asLucideChevronDownIcon = fixed.asHook;
export const lucideChevronDownIcon = fixed.prototype;
export default lucideChevronDownIcon;
