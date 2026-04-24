// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-right-to-line' as const;
export const LUCIDE_ARROW_RIGHT_TO_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 12H3' }),
  svg.path({ d: 'm11 18 6-6-6-6' }),
  svg.path({ d: 'M21 5v14' }),
];

export function renderLucideArrowRightToLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_RIGHT_TO_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-right-to-line-icon',
  prototypeName: 'lucide-arrow-right-to-line-icon',
  shapeFactory: LUCIDE_ARROW_RIGHT_TO_LINE_SHAPE_FACTORY,
});

export const asLucideArrowRightToLineIcon = fixed.asHook;
export const lucideArrowRightToLineIcon = fixed.prototype;
export default lucideArrowRightToLineIcon;
