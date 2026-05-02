// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-terminal' as const;
export const LUCIDE_SQUARE_TERMINAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 11 2-2-2-2' }),
  svg.path({ d: 'M11 13h4' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
];

export function renderLucideSquareTerminalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_TERMINAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-terminal-icon',
  prototypeName: 'lucide-square-terminal-icon',
  shapeFactory: LUCIDE_SQUARE_TERMINAL_SHAPE_FACTORY,
});

export const asLucideSquareTerminalIcon = fixed.asHook;
export const lucideSquareTerminalIcon = fixed.prototype;
export default lucideSquareTerminalIcon;
