// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'redo-dot' as const;
export const LUCIDE_REDO_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 17, r: 1 }),
  svg.path({ d: 'M21 7v6h-6' }),
  svg.path({ d: 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7' }),
];

export function renderLucideRedoDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REDO_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-redo-dot-icon',
  prototypeName: 'lucide-redo-dot-icon',
  shapeFactory: LUCIDE_REDO_DOT_SHAPE_FACTORY,
});

export const asLucideRedoDotIcon = fixed.asHook;
export const lucideRedoDotIcon = fixed.prototype;
export default lucideRedoDotIcon;
