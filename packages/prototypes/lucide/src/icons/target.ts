// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'target' as const;
export const LUCIDE_TARGET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.circle({ cx: 12, cy: 12, r: 6 }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
];

export function renderLucideTargetIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TARGET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-target-icon',
  prototypeName: 'lucide-target-icon',
  shapeFactory: LUCIDE_TARGET_SHAPE_FACTORY,
});

export const asLucideTargetIcon = fixed.asHook;
export const lucideTargetIcon = fixed.prototype;
export default lucideTargetIcon;
