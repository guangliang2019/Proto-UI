// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-pointer' as const;
export const LUCIDE_MOUSE_POINTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12.586 12.586 19 19' }),
  svg.path({
    d: 'M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z',
  }),
];

export function renderLucideMousePointerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_POINTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-pointer-icon',
  prototypeName: 'lucide-mouse-pointer-icon',
  shapeFactory: LUCIDE_MOUSE_POINTER_SHAPE_FACTORY,
});

export const asLucideMousePointerIcon = fixed.asHook;
export const lucideMousePointerIcon = fixed.prototype;
export default lucideMousePointerIcon;
