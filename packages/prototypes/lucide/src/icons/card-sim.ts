// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'card-sim' as const;
export const LUCIDE_CARD_SIM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 14v4' }),
  svg.path({
    d: 'M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
  }),
  svg.path({ d: 'M8 14h8' }),
  svg.rect({ x: 8, y: 10, width: 8, height: 8, rx: 1 }),
];

export function renderLucideCardSimIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CARD_SIM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-card-sim-icon',
  prototypeName: 'lucide-card-sim-icon',
  shapeFactory: LUCIDE_CARD_SIM_SHAPE_FACTORY,
});

export const asLucideCardSimIcon = fixed.asHook;
export const lucideCardSimIcon = fixed.prototype;
export default lucideCardSimIcon;
