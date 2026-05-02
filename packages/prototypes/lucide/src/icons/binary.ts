// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'binary' as const;
export const LUCIDE_BINARY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 14, y: 14, width: 4, height: 6, rx: 2 }),
  svg.rect({ x: 6, y: 4, width: 4, height: 6, rx: 2 }),
  svg.path({ d: 'M6 20h4' }),
  svg.path({ d: 'M14 10h4' }),
  svg.path({ d: 'M6 14h2v6' }),
  svg.path({ d: 'M14 4h2v6' }),
];

export function renderLucideBinaryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BINARY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-binary-icon',
  prototypeName: 'lucide-binary-icon',
  shapeFactory: LUCIDE_BINARY_SHAPE_FACTORY,
});

export const asLucideBinaryIcon = fixed.asHook;
export const lucideBinaryIcon = fixed.prototype;
export default lucideBinaryIcon;
