// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'undo-dot' as const;
export const LUCIDE_UNDO_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 17a9 9 0 0 0-15-6.7L3 13' }),
  svg.path({ d: 'M3 7v6h6' }),
  svg.circle({ cx: 12, cy: 17, r: 1 }),
];

export function renderLucideUndoDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNDO_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-undo-dot-icon',
  prototypeName: 'lucide-undo-dot-icon',
  shapeFactory: LUCIDE_UNDO_DOT_SHAPE_FACTORY,
});

export const asLucideUndoDotIcon = fixed.asHook;
export const lucideUndoDotIcon = fixed.prototype;
export default lucideUndoDotIcon;
