// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-pointer-2' as const;
export const LUCIDE_MOUSE_POINTER_2_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z',
  });

export function renderLucideMousePointer2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_POINTER_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-pointer-2-icon',
  prototypeName: 'lucide-mouse-pointer-2-icon',
  shapeFactory: LUCIDE_MOUSE_POINTER_2_SHAPE_FACTORY,
});

export const asLucideMousePointer2Icon = fixed.asHook;
export const lucideMousePointer2Icon = fixed.prototype;
export default lucideMousePointer2Icon;
