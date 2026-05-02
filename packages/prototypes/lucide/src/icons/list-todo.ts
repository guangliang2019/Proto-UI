// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-todo' as const;
export const LUCIDE_LIST_TODO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 5h8' }),
  svg.path({ d: 'M13 12h8' }),
  svg.path({ d: 'M13 19h8' }),
  svg.path({ d: 'm3 17 2 2 4-4' }),
  svg.rect({ x: 3, y: 4, width: 6, height: 6, rx: 1 }),
];

export function renderLucideListTodoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_TODO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-todo-icon',
  prototypeName: 'lucide-list-todo-icon',
  shapeFactory: LUCIDE_LIST_TODO_SHAPE_FACTORY,
});

export const asLucideListTodoIcon = fixed.asHook;
export const lucideListTodoIcon = fixed.prototype;
export default lucideListTodoIcon;
