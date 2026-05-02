// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-pile' as const;
export const LUCIDE_CIRCLE_PILE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 19, r: 2 }),
  svg.circle({ cx: 12, cy: 5, r: 2 }),
  svg.circle({ cx: 16, cy: 12, r: 2 }),
  svg.circle({ cx: 20, cy: 19, r: 2 }),
  svg.circle({ cx: 4, cy: 19, r: 2 }),
  svg.circle({ cx: 8, cy: 12, r: 2 }),
];

export function renderLucideCirclePileIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PILE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-pile-icon',
  prototypeName: 'lucide-circle-pile-icon',
  shapeFactory: LUCIDE_CIRCLE_PILE_SHAPE_FACTORY,
});

export const asLucideCirclePileIcon = fixed.asHook;
export const lucideCirclePileIcon = fixed.prototype;
export default lucideCirclePileIcon;
