// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bookmark-check' as const;
export const LUCIDE_BOOKMARK_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
  }),
  svg.path({ d: 'm9 10 2 2 4-4' }),
];

export function renderLucideBookmarkCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOKMARK_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bookmark-check-icon',
  prototypeName: 'lucide-bookmark-check-icon',
  shapeFactory: LUCIDE_BOOKMARK_CHECK_SHAPE_FACTORY,
});

export const asLucideBookmarkCheckIcon = fixed.asHook;
export const lucideBookmarkCheckIcon = fixed.prototype;
export default lucideBookmarkCheckIcon;
