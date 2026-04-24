// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-kanban' as const;
export const LUCIDE_FOLDER_KANBAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z',
  }),
  svg.path({ d: 'M8 10v4' }),
  svg.path({ d: 'M12 10v2' }),
  svg.path({ d: 'M16 10v6' }),
];

export function renderLucideFolderKanbanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_KANBAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-kanban-icon',
  prototypeName: 'lucide-folder-kanban-icon',
  shapeFactory: LUCIDE_FOLDER_KANBAN_SHAPE_FACTORY,
});

export const asLucideFolderKanbanIcon = fixed.asHook;
export const lucideFolderKanbanIcon = fixed.prototype;
export default lucideFolderKanbanIcon;
