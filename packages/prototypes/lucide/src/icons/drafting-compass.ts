// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'drafting-compass' as const;
export const LUCIDE_DRAFTING_COMPASS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12.99 6.74 1.93 3.44' }),
  svg.path({ d: 'M19.136 12a10 10 0 0 1-14.271 0' }),
  svg.path({ d: 'm21 21-2.16-3.84' }),
  svg.path({ d: 'm3 21 8.02-14.26' }),
  svg.circle({ cx: 12, cy: 5, r: 2 }),
];

export function renderLucideDraftingCompassIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DRAFTING_COMPASS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-drafting-compass-icon',
  prototypeName: 'lucide-drafting-compass-icon',
  shapeFactory: LUCIDE_DRAFTING_COMPASS_SHAPE_FACTORY,
});

export const asLucideDraftingCompassIcon = fixed.asHook;
export const lucideDraftingCompassIcon = fixed.prototype;
export default lucideDraftingCompassIcon;
