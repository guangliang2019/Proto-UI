// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bath' as const;
export const LUCIDE_BATH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 4 8 6' }),
  svg.path({ d: 'M17 19v2' }),
  svg.path({ d: 'M2 12h20' }),
  svg.path({ d: 'M7 19v2' }),
  svg.path({ d: 'M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5' }),
];

export function renderLucideBathIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bath-icon',
  prototypeName: 'lucide-bath-icon',
  shapeFactory: LUCIDE_BATH_SHAPE_FACTORY,
});

export const asLucideBathIcon = fixed.asHook;
export const lucideBathIcon = fixed.prototype;
export default lucideBathIcon;
