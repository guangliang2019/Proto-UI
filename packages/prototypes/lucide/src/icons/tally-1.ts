// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tally-1' as const;
export const LUCIDE_TALLY_1_SHAPE_FACTORY: LucideShapeFactory = (svg) => svg.path({ d: 'M4 4v16' });

export function renderLucideTally1Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TALLY_1_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tally-1-icon',
  prototypeName: 'lucide-tally-1-icon',
  shapeFactory: LUCIDE_TALLY_1_SHAPE_FACTORY,
});

export const asLucideTally1Icon = fixed.asHook;
export const lucideTally1Icon = fixed.prototype;
export default lucideTally1Icon;
