// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-left-to-line' as const;
export const LUCIDE_ARROW_LEFT_TO_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 19V5' }),
  svg.path({ d: 'm13 6-6 6 6 6' }),
  svg.path({ d: 'M7 12h14' }),
];

export function renderLucideArrowLeftToLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_LEFT_TO_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-left-to-line-icon',
  prototypeName: 'lucide-arrow-left-to-line-icon',
  shapeFactory: LUCIDE_ARROW_LEFT_TO_LINE_SHAPE_FACTORY,
});

export const asLucideArrowLeftToLineIcon = fixed.asHook;
export const lucideArrowLeftToLineIcon = fixed.prototype;
export default lucideArrowLeftToLineIcon;
