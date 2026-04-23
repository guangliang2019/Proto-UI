// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-plus' as const;
export const LUCIDE_CIRCLE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M8 12h8' }),
  svg.path({ d: 'M12 8v8' }),
];

export function renderLucideCirclePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-plus-icon',
  prototypeName: 'lucide-circle-plus-icon',
  shapeFactory: LUCIDE_CIRCLE_PLUS_SHAPE_FACTORY,
});

export const asLucideCirclePlusIcon = fixed.asHook;
export const lucideCirclePlusIcon = fixed.prototype;
export default lucideCirclePlusIcon;
