// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'house-plus' as const;
export const LUCIDE_HOUSE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35',
  }),
  svg.path({ d: 'M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8' }),
  svg.path({ d: 'M15 18h6' }),
  svg.path({ d: 'M18 15v6' }),
];

export function renderLucideHousePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOUSE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-house-plus-icon',
  prototypeName: 'lucide-house-plus-icon',
  shapeFactory: LUCIDE_HOUSE_PLUS_SHAPE_FACTORY,
});

export const asLucideHousePlusIcon = fixed.asHook;
export const lucideHousePlusIcon = fixed.prototype;
export default lucideHousePlusIcon;
