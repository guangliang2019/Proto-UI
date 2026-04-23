// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'copy-x' as const;
export const LUCIDE_COPY_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 12, x2: 18, y1: 12, y2: 18 }),
  svg.line({ x1: 12, x2: 18, y1: 18, y2: 12 }),
  svg.rect({ width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2 }),
  svg.path({ d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }),
];

export function renderLucideCopyXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COPY_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-copy-x-icon',
  prototypeName: 'lucide-copy-x-icon',
  shapeFactory: LUCIDE_COPY_X_SHAPE_FACTORY,
});

export const asLucideCopyXIcon = fixed.asHook;
export const lucideCopyXIcon = fixed.prototype;
export default lucideCopyXIcon;
