// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chess-bishop' as const;
export const LUCIDE_CHESS_BISHOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z' }),
  svg.path({
    d: 'M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18',
  }),
  svg.path({ d: 'm16 7-2.5 2.5' }),
  svg.path({ d: 'M9 2h6' }),
];

export function renderLucideChessBishopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHESS_BISHOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chess-bishop-icon',
  prototypeName: 'lucide-chess-bishop-icon',
  shapeFactory: LUCIDE_CHESS_BISHOP_SHAPE_FACTORY,
});

export const asLucideChessBishopIcon = fixed.asHook;
export const lucideChessBishopIcon = fixed.prototype;
export default lucideChessBishopIcon;
