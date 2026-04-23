// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-left' as const;
export const LUCIDE_ARROW_DOWN_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 7 7 17' }),
  svg.path({ d: 'M17 17H7V7' }),
];

export function renderLucideArrowDownLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-left-icon',
  prototypeName: 'lucide-arrow-down-left-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_LEFT_SHAPE_FACTORY,
});

export const asLucideArrowDownLeftIcon = fixed.asHook;
export const lucideArrowDownLeftIcon = fixed.prototype;
export default lucideArrowDownLeftIcon;
