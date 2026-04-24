// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bed-double' as const;
export const LUCIDE_BED_DOUBLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8' }),
  svg.path({ d: 'M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4' }),
  svg.path({ d: 'M12 4v6' }),
  svg.path({ d: 'M2 18h20' }),
];

export function renderLucideBedDoubleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BED_DOUBLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bed-double-icon',
  prototypeName: 'lucide-bed-double-icon',
  shapeFactory: LUCIDE_BED_DOUBLE_SHAPE_FACTORY,
});

export const asLucideBedDoubleIcon = fixed.asHook;
export const lucideBedDoubleIcon = fixed.prototype;
export default lucideBedDoubleIcon;
