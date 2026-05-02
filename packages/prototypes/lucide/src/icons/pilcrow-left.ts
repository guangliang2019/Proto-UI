// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pilcrow-left' as const;
export const LUCIDE_PILCROW_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 3v11' }),
  svg.path({ d: 'M14 9h-3a3 3 0 0 1 0-6h9' }),
  svg.path({ d: 'M18 3v11' }),
  svg.path({ d: 'M22 18H2l4-4' }),
  svg.path({ d: 'm6 22-4-4' }),
];

export function renderLucidePilcrowLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PILCROW_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pilcrow-left-icon',
  prototypeName: 'lucide-pilcrow-left-icon',
  shapeFactory: LUCIDE_PILCROW_LEFT_SHAPE_FACTORY,
});

export const asLucidePilcrowLeftIcon = fixed.asHook;
export const lucidePilcrowLeftIcon = fixed.prototype;
export default lucidePilcrowLeftIcon;
