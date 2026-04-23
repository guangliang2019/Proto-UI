// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rotate-cw' as const;
export const LUCIDE_ROTATE_CW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }),
  svg.path({ d: 'M21 3v5h-5' }),
];

export function renderLucideRotateCwIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROTATE_CW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rotate-cw-icon',
  prototypeName: 'lucide-rotate-cw-icon',
  shapeFactory: LUCIDE_ROTATE_CW_SHAPE_FACTORY,
});

export const asLucideRotateCwIcon = fixed.asHook;
export const lucideRotateCwIcon = fixed.prototype;
export default lucideRotateCwIcon;
