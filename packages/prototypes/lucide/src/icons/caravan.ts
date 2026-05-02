// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'caravan' as const;
export const LUCIDE_CARAVAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2' }),
  svg.path({ d: 'M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2' }),
  svg.path({ d: 'M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9' }),
  svg.circle({ cx: 8, cy: 19, r: 2 }),
];

export function renderLucideCaravanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CARAVAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-caravan-icon',
  prototypeName: 'lucide-caravan-icon',
  shapeFactory: LUCIDE_CARAVAN_SHAPE_FACTORY,
});

export const asLucideCaravanIcon = fixed.asHook;
export const lucideCaravanIcon = fixed.prototype;
export default lucideCaravanIcon;
