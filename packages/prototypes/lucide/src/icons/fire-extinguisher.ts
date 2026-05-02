// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fire-extinguisher' as const;
export const LUCIDE_FIRE_EXTINGUISHER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5' }),
  svg.path({ d: 'M9 18h8' }),
  svg.path({ d: 'M18 3h-3' }),
  svg.path({ d: 'M11 3a6 6 0 0 0-6 6v11' }),
  svg.path({ d: 'M5 13h4' }),
  svg.path({ d: 'M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z' }),
];

export function renderLucideFireExtinguisherIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FIRE_EXTINGUISHER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fire-extinguisher-icon',
  prototypeName: 'lucide-fire-extinguisher-icon',
  shapeFactory: LUCIDE_FIRE_EXTINGUISHER_SHAPE_FACTORY,
});

export const asLucideFireExtinguisherIcon = fixed.asHook;
export const lucideFireExtinguisherIcon = fixed.prototype;
export default lucideFireExtinguisherIcon;
