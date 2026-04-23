// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pointer-off' as const;
export const LUCIDE_POINTER_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 4.5V4a2 2 0 0 0-2.41-1.957' }),
  svg.path({ d: 'M13.9 8.4a2 2 0 0 0-1.26-1.295' }),
  svg.path({ d: 'M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158' }),
  svg.path({
    d: 'm7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343',
  }),
  svg.path({ d: 'M6 6v8' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucidePointerOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POINTER_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pointer-off-icon',
  prototypeName: 'lucide-pointer-off-icon',
  shapeFactory: LUCIDE_POINTER_OFF_SHAPE_FACTORY,
});

export const asLucidePointerOffIcon = fixed.asHook;
export const lucidePointerOffIcon = fixed.prototype;
export default lucidePointerOffIcon;
