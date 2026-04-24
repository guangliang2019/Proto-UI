// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'copyleft' as const;
export const LUCIDE_COPYLEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M9.17 14.83a4 4 0 1 0 0-5.66' }),
];

export function renderLucideCopyleftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COPYLEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-copyleft-icon',
  prototypeName: 'lucide-copyleft-icon',
  shapeFactory: LUCIDE_COPYLEFT_SHAPE_FACTORY,
});

export const asLucideCopyleftIcon = fixed.asHook;
export const lucideCopyleftIcon = fixed.prototype;
export default lucideCopyleftIcon;
