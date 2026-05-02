// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sword' as const;
export const LUCIDE_SWORD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm11 19-6-6' }),
  svg.path({ d: 'm5 21-2-2' }),
  svg.path({ d: 'm8 16-4 4' }),
  svg.path({ d: 'M9.5 17.5 21 6V3h-3L6.5 14.5' }),
];

export function renderLucideSwordIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SWORD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sword-icon',
  prototypeName: 'lucide-sword-icon',
  shapeFactory: LUCIDE_SWORD_SHAPE_FACTORY,
});

export const asLucideSwordIcon = fixed.asHook;
export const lucideSwordIcon = fixed.prototype;
export default lucideSwordIcon;
