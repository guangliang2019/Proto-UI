// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chess-queen' as const;
export const LUCIDE_CHESS_QUEEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z' }),
  svg.path({ d: 'm12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402' }),
  svg.path({ d: 'm20 9-3 9' }),
  svg.path({ d: 'm5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34' }),
  svg.path({ d: 'M7 18 4 9' }),
  svg.circle({ cx: 12, cy: 4, r: 2 }),
  svg.circle({ cx: 20, cy: 7, r: 2 }),
  svg.circle({ cx: 4, cy: 7, r: 2 }),
];

export function renderLucideChessQueenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHESS_QUEEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chess-queen-icon',
  prototypeName: 'lucide-chess-queen-icon',
  shapeFactory: LUCIDE_CHESS_QUEEN_SHAPE_FACTORY,
});

export const asLucideChessQueenIcon = fixed.asHook;
export const lucideChessQueenIcon = fixed.prototype;
export default lucideChessQueenIcon;
