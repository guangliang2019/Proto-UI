// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-pound-sterling' as const;
export const LUCIDE_CIRCLE_POUND_STERLING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M10 16V9.5a1 1 0 0 1 5 0' }),
  svg.path({ d: 'M8 12h4' }),
  svg.path({ d: 'M8 16h7' }),
];

export function renderLucideCirclePoundSterlingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_POUND_STERLING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-pound-sterling-icon',
  prototypeName: 'lucide-circle-pound-sterling-icon',
  shapeFactory: LUCIDE_CIRCLE_POUND_STERLING_SHAPE_FACTORY,
});

export const asLucideCirclePoundSterlingIcon = fixed.asHook;
export const lucideCirclePoundSterlingIcon = fixed.prototype;
export default lucideCirclePoundSterlingIcon;
