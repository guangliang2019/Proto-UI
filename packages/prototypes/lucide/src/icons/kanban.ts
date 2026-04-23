// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'kanban' as const;
export const LUCIDE_KANBAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 3v14' }),
  svg.path({ d: 'M12 3v8' }),
  svg.path({ d: 'M19 3v18' }),
];

export function renderLucideKanbanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KANBAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-kanban-icon',
  prototypeName: 'lucide-kanban-icon',
  shapeFactory: LUCIDE_KANBAN_SHAPE_FACTORY,
});

export const asLucideKanbanIcon = fixed.asHook;
export const lucideKanbanIcon = fixed.prototype;
export default lucideKanbanIcon;
