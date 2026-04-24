// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pilcrow-right' as const;
export const LUCIDE_PILCROW_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 3v11' }),
  svg.path({ d: 'M10 9H7a1 1 0 0 1 0-6h8' }),
  svg.path({ d: 'M14 3v11' }),
  svg.path({ d: 'm18 14 4 4H2' }),
  svg.path({ d: 'm22 18-4 4' }),
];

export function renderLucidePilcrowRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PILCROW_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pilcrow-right-icon',
  prototypeName: 'lucide-pilcrow-right-icon',
  shapeFactory: LUCIDE_PILCROW_RIGHT_SHAPE_FACTORY,
});

export const asLucidePilcrowRightIcon = fixed.asHook;
export const lucidePilcrowRightIcon = fixed.prototype;
export default lucidePilcrowRightIcon;
