// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'anvil' as const;
export const LUCIDE_ANVIL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4' }),
  svg.path({ d: 'M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z' }),
  svg.path({ d: 'M9 12v5' }),
  svg.path({ d: 'M15 12v5' }),
  svg.path({ d: 'M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1' }),
];

export function renderLucideAnvilIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ANVIL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-anvil-icon',
  prototypeName: 'lucide-anvil-icon',
  shapeFactory: LUCIDE_ANVIL_SHAPE_FACTORY,
});

export const asLucideAnvilIcon = fixed.asHook;
export const lucideAnvilIcon = fixed.prototype;
export default lucideAnvilIcon;
