// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pause' as const;
export const LUCIDE_PAUSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 14, y: 3, width: 5, height: 18, rx: 1 }),
  svg.rect({ x: 5, y: 3, width: 5, height: 18, rx: 1 }),
];

export function renderLucidePauseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PAUSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pause-icon',
  prototypeName: 'lucide-pause-icon',
  shapeFactory: LUCIDE_PAUSE_SHAPE_FACTORY,
});

export const asLucidePauseIcon = fixed.asHook;
export const lucidePauseIcon = fixed.prototype;
export default lucidePauseIcon;
