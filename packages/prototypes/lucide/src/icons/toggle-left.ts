// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'toggle-left' as const;
export const LUCIDE_TOGGLE_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 9, cy: 12, r: 3 }),
  svg.rect({ width: 20, height: 14, x: 2, y: 5, rx: 7 }),
];

export function renderLucideToggleLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOGGLE_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-toggle-left-icon',
  prototypeName: 'lucide-toggle-left-icon',
  shapeFactory: LUCIDE_TOGGLE_LEFT_SHAPE_FACTORY,
});

export const asLucideToggleLeftIcon = fixed.asHook;
export const lucideToggleLeftIcon = fixed.prototype;
export default lucideToggleLeftIcon;
