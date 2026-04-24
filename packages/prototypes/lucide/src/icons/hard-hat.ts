// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hard-hat' as const;
export const LUCIDE_HARD_HAT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5' }),
  svg.path({ d: 'M14 6a6 6 0 0 1 6 6v3' }),
  svg.path({ d: 'M4 15v-3a6 6 0 0 1 6-6' }),
  svg.rect({ x: 2, y: 15, width: 20, height: 4, rx: 1 }),
];

export function renderLucideHardHatIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HARD_HAT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hard-hat-icon',
  prototypeName: 'lucide-hard-hat-icon',
  shapeFactory: LUCIDE_HARD_HAT_SHAPE_FACTORY,
});

export const asLucideHardHatIcon = fixed.asHook;
export const lucideHardHatIcon = fixed.prototype;
export default lucideHardHatIcon;
