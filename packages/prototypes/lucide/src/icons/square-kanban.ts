// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-kanban' as const;
export const LUCIDE_SQUARE_KANBAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M8 7v7' }),
  svg.path({ d: 'M12 7v4' }),
  svg.path({ d: 'M16 7v9' }),
];

export function renderLucideSquareKanbanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_KANBAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-kanban-icon',
  prototypeName: 'lucide-square-kanban-icon',
  shapeFactory: LUCIDE_SQUARE_KANBAN_SHAPE_FACTORY,
});

export const asLucideSquareKanbanIcon = fixed.asHook;
export const lucideSquareKanbanIcon = fixed.prototype;
export default lucideSquareKanbanIcon;
