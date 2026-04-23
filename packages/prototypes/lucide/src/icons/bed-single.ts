// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bed-single' as const;
export const LUCIDE_BED_SINGLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8' }),
  svg.path({ d: 'M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4' }),
  svg.path({ d: 'M3 18h18' }),
];

export function renderLucideBedSingleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BED_SINGLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bed-single-icon',
  prototypeName: 'lucide-bed-single-icon',
  shapeFactory: LUCIDE_BED_SINGLE_SHAPE_FACTORY,
});

export const asLucideBedSingleIcon = fixed.asHook;
export const lucideBedSingleIcon = fixed.prototype;
export default lucideBedSingleIcon;
