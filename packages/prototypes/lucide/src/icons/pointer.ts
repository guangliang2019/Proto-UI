// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pointer' as const;
export const LUCIDE_POINTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 14a8 8 0 0 1-8 8' }),
  svg.path({ d: 'M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2' }),
  svg.path({ d: 'M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1' }),
  svg.path({ d: 'M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10' }),
  svg.path({
    d: 'M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
  }),
];

export function renderLucidePointerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POINTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pointer-icon',
  prototypeName: 'lucide-pointer-icon',
  shapeFactory: LUCIDE_POINTER_SHAPE_FACTORY,
});

export const asLucidePointerIcon = fixed.asHook;
export const lucidePointerIcon = fixed.prototype;
export default lucidePointerIcon;
