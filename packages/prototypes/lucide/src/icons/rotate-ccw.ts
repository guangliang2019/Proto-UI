// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rotate-ccw' as const;
export const LUCIDE_ROTATE_CCW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
  svg.path({ d: 'M3 3v5h5' }),
];

export function renderLucideRotateCcwIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROTATE_CCW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rotate-ccw-icon',
  prototypeName: 'lucide-rotate-ccw-icon',
  shapeFactory: LUCIDE_ROTATE_CCW_SHAPE_FACTORY,
});

export const asLucideRotateCcwIcon = fixed.asHook;
export const lucideRotateCcwIcon = fixed.prototype;
export default lucideRotateCcwIcon;
