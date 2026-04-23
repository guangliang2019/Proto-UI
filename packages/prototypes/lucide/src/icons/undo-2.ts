// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'undo-2' as const;
export const LUCIDE_UNDO_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 14 4 9l5-5' }),
  svg.path({ d: 'M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11' }),
];

export function renderLucideUndo2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNDO_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-undo-2-icon',
  prototypeName: 'lucide-undo-2-icon',
  shapeFactory: LUCIDE_UNDO_2_SHAPE_FACTORY,
});

export const asLucideUndo2Icon = fixed.asHook;
export const lucideUndo2Icon = fixed.prototype;
export default lucideUndo2Icon;
