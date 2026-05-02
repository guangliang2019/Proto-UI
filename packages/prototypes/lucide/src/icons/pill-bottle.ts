// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pill-bottle' as const;
export const LUCIDE_PILL_BOTTLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4' }),
  svg.path({ d: 'M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7' }),
  svg.rect({ width: 16, height: 5, x: 4, y: 2, rx: 1 }),
];

export function renderLucidePillBottleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PILL_BOTTLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pill-bottle-icon',
  prototypeName: 'lucide-pill-bottle-icon',
  shapeFactory: LUCIDE_PILL_BOTTLE_SHAPE_FACTORY,
});

export const asLucidePillBottleIcon = fixed.asHook;
export const lucidePillBottleIcon = fixed.prototype;
export default lucidePillBottleIcon;
