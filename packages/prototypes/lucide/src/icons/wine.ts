// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wine' as const;
export const LUCIDE_WINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 22h8' }),
  svg.path({ d: 'M7 10h10' }),
  svg.path({ d: 'M12 15v7' }),
  svg.path({ d: 'M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z' }),
];

export function renderLucideWineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wine-icon',
  prototypeName: 'lucide-wine-icon',
  shapeFactory: LUCIDE_WINE_SHAPE_FACTORY,
});

export const asLucideWineIcon = fixed.asHook;
export const lucideWineIcon = fixed.prototype;
export default lucideWineIcon;
