// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bandage' as const;
export const LUCIDE_BANDAGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 10.01h.01' }),
  svg.path({ d: 'M10 14.01h.01' }),
  svg.path({ d: 'M14 10.01h.01' }),
  svg.path({ d: 'M14 14.01h.01' }),
  svg.path({ d: 'M18 6v12' }),
  svg.path({ d: 'M6 6v12' }),
  svg.rect({ x: 2, y: 6, width: 20, height: 12, rx: 2 }),
];

export function renderLucideBandageIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BANDAGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bandage-icon',
  prototypeName: 'lucide-bandage-icon',
  shapeFactory: LUCIDE_BANDAGE_SHAPE_FACTORY,
});

export const asLucideBandageIcon = fixed.asHook;
export const lucideBandageIcon = fixed.prototype;
export default lucideBandageIcon;
