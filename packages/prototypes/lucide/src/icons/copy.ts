// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'copy' as const;
export const LUCIDE_COPY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2 }),
  svg.path({ d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }),
];

export function renderLucideCopyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COPY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-copy-icon',
  prototypeName: 'lucide-copy-icon',
  shapeFactory: LUCIDE_COPY_SHAPE_FACTORY,
});

export const asLucideCopyIcon = fixed.asHook;
export const lucideCopyIcon = fixed.prototype;
export default lucideCopyIcon;
