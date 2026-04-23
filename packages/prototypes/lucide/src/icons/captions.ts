// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'captions' as const;
export const LUCIDE_CAPTIONS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 14, x: 3, y: 5, rx: 2, ry: 2 }),
  svg.path({ d: 'M7 15h4M15 15h2M7 11h2M13 11h4' }),
];

export function renderLucideCaptionsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAPTIONS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-captions-icon',
  prototypeName: 'lucide-captions-icon',
  shapeFactory: LUCIDE_CAPTIONS_SHAPE_FACTORY,
});

export const asLucideCaptionsIcon = fixed.asHook;
export const lucideCaptionsIcon = fixed.prototype;
export default lucideCaptionsIcon;
