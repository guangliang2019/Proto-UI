// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'delete' as const;
export const LUCIDE_DELETE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z',
  }),
  svg.path({ d: 'm12 9 6 6' }),
  svg.path({ d: 'm18 9-6 6' }),
];

export function renderLucideDeleteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DELETE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-delete-icon',
  prototypeName: 'lucide-delete-icon',
  shapeFactory: LUCIDE_DELETE_SHAPE_FACTORY,
});

export const asLucideDeleteIcon = fixed.asHook;
export const lucideDeleteIcon = fixed.prototype;
export default lucideDeleteIcon;
