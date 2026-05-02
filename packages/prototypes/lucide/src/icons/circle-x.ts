// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-x' as const;
export const LUCIDE_CIRCLE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm15 9-6 6' }),
  svg.path({ d: 'm9 9 6 6' }),
];

export function renderLucideCircleXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-x-icon',
  prototypeName: 'lucide-circle-x-icon',
  shapeFactory: LUCIDE_CIRCLE_X_SHAPE_FACTORY,
});

export const asLucideCircleXIcon = fixed.asHook;
export const lucideCircleXIcon = fixed.prototype;
export default lucideCircleXIcon;
