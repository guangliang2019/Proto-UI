// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'philippine-peso' as const;
export const LUCIDE_PHILIPPINE_PESO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 11H4' }),
  svg.path({ d: 'M20 7H4' }),
  svg.path({ d: 'M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7' }),
];

export function renderLucidePhilippinePesoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PHILIPPINE_PESO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-philippine-peso-icon',
  prototypeName: 'lucide-philippine-peso-icon',
  shapeFactory: LUCIDE_PHILIPPINE_PESO_SHAPE_FACTORY,
});

export const asLucidePhilippinePesoIcon = fixed.asHook;
export const lucidePhilippinePesoIcon = fixed.prototype;
export default lucidePhilippinePesoIcon;
