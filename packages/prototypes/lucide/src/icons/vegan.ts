// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'vegan' as const;
export const LUCIDE_VEGAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 8q6 0 6-6-6 0-6 6' }),
  svg.path({ d: 'M17.41 3.59a10 10 0 1 0 3 3' }),
  svg.path({ d: 'M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14' }),
];

export function renderLucideVeganIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VEGAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-vegan-icon',
  prototypeName: 'lucide-vegan-icon',
  shapeFactory: LUCIDE_VEGAN_SHAPE_FACTORY,
});

export const asLucideVeganIcon = fixed.asHook;
export const lucideVeganIcon = fixed.prototype;
export default lucideVeganIcon;
