// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rotate-3d' as const;
export const LUCIDE_ROTATE_3D_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2',
  }),
  svg.path({ d: 'm15.194 13.707 3.814 1.86-1.86 3.814' }),
  svg.path({
    d: 'M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4',
  }),
];

export function renderLucideRotate3dIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROTATE_3D_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rotate-3d-icon',
  prototypeName: 'lucide-rotate-3d-icon',
  shapeFactory: LUCIDE_ROTATE_3D_SHAPE_FACTORY,
});

export const asLucideRotate3dIcon = fixed.asHook;
export const lucideRotate3dIcon = fixed.prototype;
export default lucideRotate3dIcon;
