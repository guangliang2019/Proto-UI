// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-cursor' as const;
export const LUCIDE_TEXT_CURSOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1' }),
  svg.path({ d: 'M7 22h1a4 4 0 0 0 4-4v-1' }),
  svg.path({ d: 'M7 2h1a4 4 0 0 1 4 4v1' }),
];

export function renderLucideTextCursorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_CURSOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-cursor-icon',
  prototypeName: 'lucide-text-cursor-icon',
  shapeFactory: LUCIDE_TEXT_CURSOR_SHAPE_FACTORY,
});

export const asLucideTextCursorIcon = fixed.asHook;
export const lucideTextCursorIcon = fixed.prototype;
export default lucideTextCursorIcon;
