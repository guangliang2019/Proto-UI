// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'vibrate' as const;
export const LUCIDE_VIBRATE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2 8 2 2-2 2 2 2-2 2' }),
  svg.path({ d: 'm22 8-2 2 2 2-2 2 2 2' }),
  svg.rect({ width: 8, height: 14, x: 8, y: 5, rx: 1 }),
];

export function renderLucideVibrateIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VIBRATE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-vibrate-icon',
  prototypeName: 'lucide-vibrate-icon',
  shapeFactory: LUCIDE_VIBRATE_SHAPE_FACTORY,
});

export const asLucideVibrateIcon = fixed.asHook;
export const lucideVibrateIcon = fixed.prototype;
export default lucideVibrateIcon;
