// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tablet-smartphone' as const;
export const LUCIDE_TABLET_SMARTPHONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 10, height: 14, x: 3, y: 8, rx: 2 }),
  svg.path({ d: 'M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4' }),
  svg.path({ d: 'M8 18h.01' }),
];

export function renderLucideTabletSmartphoneIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLET_SMARTPHONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tablet-smartphone-icon',
  prototypeName: 'lucide-tablet-smartphone-icon',
  shapeFactory: LUCIDE_TABLET_SMARTPHONE_SHAPE_FACTORY,
});

export const asLucideTabletSmartphoneIcon = fixed.asHook;
export const lucideTabletSmartphoneIcon = fixed.prototype;
export default lucideTabletSmartphoneIcon;
