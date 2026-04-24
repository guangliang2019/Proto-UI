// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-out-up-left' as const;
export const LUCIDE_CIRCLE_ARROW_OUT_UP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 8V2h6' }),
  svg.path({ d: 'm2 2 10 10' }),
  svg.path({ d: 'M12 2A10 10 0 1 1 2 12' }),
];

export function renderLucideCircleArrowOutUpLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_OUT_UP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-out-up-left-icon',
  prototypeName: 'lucide-circle-arrow-out-up-left-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_OUT_UP_LEFT_SHAPE_FACTORY,
});

export const asLucideCircleArrowOutUpLeftIcon = fixed.asHook;
export const lucideCircleArrowOutUpLeftIcon = fixed.prototype;
export default lucideCircleArrowOutUpLeftIcon;
