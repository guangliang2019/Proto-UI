// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'headphones' as const;
export const LUCIDE_HEADPHONES_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
  });

export function renderLucideHeadphonesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADPHONES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-headphones-icon',
  prototypeName: 'lucide-headphones-icon',
  shapeFactory: LUCIDE_HEADPHONES_SHAPE_FACTORY,
});

export const asLucideHeadphonesIcon = fixed.asHook;
export const lucideHeadphonesIcon = fixed.prototype;
export default lucideHeadphonesIcon;
