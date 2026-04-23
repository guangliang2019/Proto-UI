// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'closed-caption' as const;
export const LUCIDE_CLOSED_CAPTION_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 9.17a3 3 0 1 0 0 5.66' }),
  svg.path({ d: 'M17 9.17a3 3 0 1 0 0 5.66' }),
  svg.rect({ x: 2, y: 5, width: 20, height: 14, rx: 2 }),
];

export function renderLucideClosedCaptionIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOSED_CAPTION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-closed-caption-icon',
  prototypeName: 'lucide-closed-caption-icon',
  shapeFactory: LUCIDE_CLOSED_CAPTION_SHAPE_FACTORY,
});

export const asLucideClosedCaptionIcon = fixed.asHook;
export const lucideClosedCaptionIcon = fixed.prototype;
export default lucideClosedCaptionIcon;
