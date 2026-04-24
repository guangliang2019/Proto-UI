// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'redo' as const;
export const LUCIDE_REDO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 7v6h-6' }),
  svg.path({ d: 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7' }),
];

export function renderLucideRedoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REDO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-redo-icon',
  prototypeName: 'lucide-redo-icon',
  shapeFactory: LUCIDE_REDO_SHAPE_FACTORY,
});

export const asLucideRedoIcon = fixed.asHook;
export const lucideRedoIcon = fixed.prototype;
export default lucideRedoIcon;
