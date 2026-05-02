// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'terminal' as const;
export const LUCIDE_TERMINAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 19h8' }),
  svg.path({ d: 'm4 17 6-6-6-6' }),
];

export function renderLucideTerminalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TERMINAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-terminal-icon',
  prototypeName: 'lucide-terminal-icon',
  shapeFactory: LUCIDE_TERMINAL_SHAPE_FACTORY,
});

export const asLucideTerminalIcon = fixed.asHook;
export const lucideTerminalIcon = fixed.prototype;
export default lucideTerminalIcon;
