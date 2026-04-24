// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'undo' as const;
export const LUCIDE_UNDO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 7v6h6' }),
  svg.path({ d: 'M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13' }),
];

export function renderLucideUndoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNDO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-undo-icon',
  prototypeName: 'lucide-undo-icon',
  shapeFactory: LUCIDE_UNDO_SHAPE_FACTORY,
});

export const asLucideUndoIcon = fixed.asHook;
export const lucideUndoIcon = fixed.prototype;
export default lucideUndoIcon;
