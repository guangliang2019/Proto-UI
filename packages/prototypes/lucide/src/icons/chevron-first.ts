// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevron-first' as const;
export const LUCIDE_CHEVRON_FIRST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 18-6-6 6-6' }),
  svg.path({ d: 'M7 6v12' }),
];

export function renderLucideChevronFirstIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRON_FIRST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevron-first-icon',
  prototypeName: 'lucide-chevron-first-icon',
  shapeFactory: LUCIDE_CHEVRON_FIRST_SHAPE_FACTORY,
});

export const asLucideChevronFirstIcon = fixed.asHook;
export const lucideChevronFirstIcon = fixed.prototype;
export default lucideChevronFirstIcon;
