// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tally-5' as const;
export const LUCIDE_TALLY_5_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 4v16' }),
  svg.path({ d: 'M9 4v16' }),
  svg.path({ d: 'M14 4v16' }),
  svg.path({ d: 'M19 4v16' }),
  svg.path({ d: 'M22 6 2 18' }),
];

export function renderLucideTally5Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TALLY_5_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tally-5-icon',
  prototypeName: 'lucide-tally-5-icon',
  shapeFactory: LUCIDE_TALLY_5_SHAPE_FACTORY,
});

export const asLucideTally5Icon = fixed.asHook;
export const lucideTally5Icon = fixed.prototype;
export default lucideTally5Icon;
