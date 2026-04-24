// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circuit-board' as const;
export const LUCIDE_CIRCUIT_BOARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M11 9h4a2 2 0 0 0 2-2V3' }),
  svg.circle({ cx: 9, cy: 9, r: 2 }),
  svg.path({ d: 'M7 21v-4a2 2 0 0 1 2-2h4' }),
  svg.circle({ cx: 15, cy: 15, r: 2 }),
];

export function renderLucideCircuitBoardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCUIT_BOARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circuit-board-icon',
  prototypeName: 'lucide-circuit-board-icon',
  shapeFactory: LUCIDE_CIRCUIT_BOARD_SHAPE_FACTORY,
});

export const asLucideCircuitBoardIcon = fixed.asHook;
export const lucideCircuitBoardIcon = fixed.prototype;
export default lucideCircuitBoardIcon;
