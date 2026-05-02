// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-cursor-input' as const;
export const LUCIDE_TEXT_CURSOR_INPUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6' }),
  svg.path({ d: 'M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7' }),
  svg.path({ d: 'M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1' }),
  svg.path({ d: 'M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1' }),
  svg.path({ d: 'M9 6v12' }),
];

export function renderLucideTextCursorInputIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_CURSOR_INPUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-cursor-input-icon',
  prototypeName: 'lucide-text-cursor-input-icon',
  shapeFactory: LUCIDE_TEXT_CURSOR_INPUT_SHAPE_FACTORY,
});

export const asLucideTextCursorInputIcon = fixed.asHook;
export const lucideTextCursorInputIcon = fixed.prototype;
export default lucideTextCursorInputIcon;
