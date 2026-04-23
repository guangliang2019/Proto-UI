// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'smartphone' as const;
export const LUCIDE_SMARTPHONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 }),
  svg.path({ d: 'M12 18h.01' }),
];

export function renderLucideSmartphoneIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SMARTPHONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-smartphone-icon',
  prototypeName: 'lucide-smartphone-icon',
  shapeFactory: LUCIDE_SMARTPHONE_SHAPE_FACTORY,
});

export const asLucideSmartphoneIcon = fixed.asHook;
export const lucideSmartphoneIcon = fixed.prototype;
export default lucideSmartphoneIcon;
