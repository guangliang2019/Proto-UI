// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cigarette' as const;
export const LUCIDE_CIGARETTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14' }),
  svg.path({ d: 'M18 8c0-2.5-2-2.5-2-5' }),
  svg.path({ d: 'M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' }),
  svg.path({ d: 'M22 8c0-2.5-2-2.5-2-5' }),
  svg.path({ d: 'M7 12v4' }),
];

export function renderLucideCigaretteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIGARETTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cigarette-icon',
  prototypeName: 'lucide-cigarette-icon',
  shapeFactory: LUCIDE_CIGARETTE_SHAPE_FACTORY,
});

export const asLucideCigaretteIcon = fixed.asHook;
export const lucideCigaretteIcon = fixed.prototype;
export default lucideCigaretteIcon;
