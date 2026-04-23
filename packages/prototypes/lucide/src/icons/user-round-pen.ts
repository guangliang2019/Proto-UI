// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-pen' as const;
export const LUCIDE_USER_ROUND_PEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 21a8 8 0 0 1 10.821-7.487' }),
  svg.path({
    d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
  }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
];

export function renderLucideUserRoundPenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_PEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-pen-icon',
  prototypeName: 'lucide-user-round-pen-icon',
  shapeFactory: LUCIDE_USER_ROUND_PEN_SHAPE_FACTORY,
});

export const asLucideUserRoundPenIcon = fixed.asHook;
export const lucideUserRoundPenIcon = fixed.prototype;
export default lucideUserRoundPenIcon;
