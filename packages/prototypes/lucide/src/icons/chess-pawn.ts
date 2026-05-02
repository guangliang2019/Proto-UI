// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chess-pawn' as const;
export const LUCIDE_CHESS_PAWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z' }),
  svg.path({ d: 'm14.5 10 1.5 8' }),
  svg.path({ d: 'M7 10h10' }),
  svg.path({ d: 'm8 18 1.5-8' }),
  svg.circle({ cx: 12, cy: 6, r: 4 }),
];

export function renderLucideChessPawnIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHESS_PAWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chess-pawn-icon',
  prototypeName: 'lucide-chess-pawn-icon',
  shapeFactory: LUCIDE_CHESS_PAWN_SHAPE_FACTORY,
});

export const asLucideChessPawnIcon = fixed.asHook;
export const lucideChessPawnIcon = fixed.prototype;
export default lucideChessPawnIcon;
