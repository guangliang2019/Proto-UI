// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-left' as const;
export const LUCIDE_ARROW_UP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 17V7h10' }),
  svg.path({ d: 'M17 17 7 7' }),
];

export function renderLucideArrowUpLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-left-icon',
  prototypeName: 'lucide-arrow-up-left-icon',
  shapeFactory: LUCIDE_ARROW_UP_LEFT_SHAPE_FACTORY,
});

export const asLucideArrowUpLeftIcon = fixed.asHook;
export const lucideArrowUpLeftIcon = fixed.prototype;
export default lucideArrowUpLeftIcon;
