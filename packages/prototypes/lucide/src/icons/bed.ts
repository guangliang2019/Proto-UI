// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bed' as const;
export const LUCIDE_BED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 4v16' }),
  svg.path({ d: 'M2 8h18a2 2 0 0 1 2 2v10' }),
  svg.path({ d: 'M2 17h20' }),
  svg.path({ d: 'M6 8v9' }),
];

export function renderLucideBedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bed-icon',
  prototypeName: 'lucide-bed-icon',
  shapeFactory: LUCIDE_BED_SHAPE_FACTORY,
});

export const asLucideBedIcon = fixed.asHook;
export const lucideBedIcon = fixed.prototype;
export default lucideBedIcon;
