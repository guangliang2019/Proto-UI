// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-slash-2' as const;
export const LUCIDE_CIRCLE_SLASH_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M22 2 2 22' }),
];

export function renderLucideCircleSlash2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_SLASH_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-slash-2-icon',
  prototypeName: 'lucide-circle-slash-2-icon',
  shapeFactory: LUCIDE_CIRCLE_SLASH_2_SHAPE_FACTORY,
});

export const asLucideCircleSlash2Icon = fixed.asHook;
export const lucideCircleSlash2Icon = fixed.prototype;
export default lucideCircleSlash2Icon;
