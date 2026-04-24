// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bird' as const;
export const LUCIDE_BIRD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 7h.01' }),
  svg.path({ d: 'M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20' }),
  svg.path({ d: 'm20 7 2 .5-2 .5' }),
  svg.path({ d: 'M10 18v3' }),
  svg.path({ d: 'M14 17.75V21' }),
  svg.path({ d: 'M7 18a6 6 0 0 0 3.84-10.61' }),
];

export function renderLucideBirdIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BIRD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bird-icon',
  prototypeName: 'lucide-bird-icon',
  shapeFactory: LUCIDE_BIRD_SHAPE_FACTORY,
});

export const asLucideBirdIcon = fixed.asHook;
export const lucideBirdIcon = fixed.prototype;
export default lucideBirdIcon;
