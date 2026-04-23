// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chess-rook' as const;
export const LUCIDE_CHESS_ROOK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z' }),
  svg.path({ d: 'M10 2v2' }),
  svg.path({ d: 'M14 2v2' }),
  svg.path({ d: 'm17 18-1-9' }),
  svg.path({ d: 'M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2' }),
  svg.path({ d: 'M6 4h12' }),
  svg.path({ d: 'm7 18 1-9' }),
];

export function renderLucideChessRookIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHESS_ROOK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chess-rook-icon',
  prototypeName: 'lucide-chess-rook-icon',
  shapeFactory: LUCIDE_CHESS_ROOK_SHAPE_FACTORY,
});

export const asLucideChessRookIcon = fixed.asHook;
export const lucideChessRookIcon = fixed.prototype;
export default lucideChessRookIcon;
