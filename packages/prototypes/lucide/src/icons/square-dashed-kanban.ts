// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-dashed-kanban' as const;
export const LUCIDE_SQUARE_DASHED_KANBAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 7v7' }),
  svg.path({ d: 'M12 7v4' }),
  svg.path({ d: 'M16 7v9' }),
  svg.path({ d: 'M5 3a2 2 0 0 0-2 2' }),
  svg.path({ d: 'M9 3h1' }),
  svg.path({ d: 'M14 3h1' }),
  svg.path({ d: 'M19 3a2 2 0 0 1 2 2' }),
  svg.path({ d: 'M21 9v1' }),
  svg.path({ d: 'M21 14v1' }),
  svg.path({ d: 'M21 19a2 2 0 0 1-2 2' }),
  svg.path({ d: 'M14 21h1' }),
  svg.path({ d: 'M9 21h1' }),
  svg.path({ d: 'M5 21a2 2 0 0 1-2-2' }),
  svg.path({ d: 'M3 14v1' }),
  svg.path({ d: 'M3 9v1' }),
];

export function renderLucideSquareDashedKanbanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_DASHED_KANBAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-dashed-kanban-icon',
  prototypeName: 'lucide-square-dashed-kanban-icon',
  shapeFactory: LUCIDE_SQUARE_DASHED_KANBAN_SHAPE_FACTORY,
});

export const asLucideSquareDashedKanbanIcon = fixed.asHook;
export const lucideSquareDashedKanbanIcon = fixed.prototype;
export default lucideSquareDashedKanbanIcon;
