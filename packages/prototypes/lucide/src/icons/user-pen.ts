// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-pen' as const;
export const LUCIDE_USER_PEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11.5 15H7a4 4 0 0 0-4 4v2' }),
  svg.path({
    d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
  }),
  svg.circle({ cx: 10, cy: 7, r: 4 }),
];

export function renderLucideUserPenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_PEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-pen-icon',
  prototypeName: 'lucide-user-pen-icon',
  shapeFactory: LUCIDE_USER_PEN_SHAPE_FACTORY,
});

export const asLucideUserPenIcon = fixed.asHook;
export const lucideUserPenIcon = fixed.prototype;
export default lucideUserPenIcon;
