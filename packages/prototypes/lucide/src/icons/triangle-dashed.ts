// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'triangle-dashed' as const;
export const LUCIDE_TRIANGLE_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.17 4.193a2 2 0 0 1 3.666.013' }),
  svg.path({ d: 'M14 21h2' }),
  svg.path({ d: 'm15.874 7.743 1 1.732' }),
  svg.path({ d: 'm18.849 12.952 1 1.732' }),
  svg.path({ d: 'M21.824 18.18a2 2 0 0 1-1.835 2.824' }),
  svg.path({ d: 'M4.024 21a2 2 0 0 1-1.839-2.839' }),
  svg.path({ d: 'm5.136 12.952-1 1.732' }),
  svg.path({ d: 'M8 21h2' }),
  svg.path({ d: 'm8.102 7.743-1 1.732' }),
];

export function renderLucideTriangleDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRIANGLE_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-triangle-dashed-icon',
  prototypeName: 'lucide-triangle-dashed-icon',
  shapeFactory: LUCIDE_TRIANGLE_DASHED_SHAPE_FACTORY,
});

export const asLucideTriangleDashedIcon = fixed.asHook;
export const lucideTriangleDashedIcon = fixed.prototype;
export default lucideTriangleDashedIcon;
