// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bookmark-x' as const;
export const LUCIDE_BOOKMARK_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14.5 7.5-5 5' }),
  svg.path({
    d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
  }),
  svg.path({ d: 'm9.5 7.5 5 5' }),
];

export function renderLucideBookmarkXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOOKMARK_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bookmark-x-icon',
  prototypeName: 'lucide-bookmark-x-icon',
  shapeFactory: LUCIDE_BOOKMARK_X_SHAPE_FACTORY,
});

export const asLucideBookmarkXIcon = fixed.asHook;
export const lucideBookmarkXIcon = fixed.prototype;
export default lucideBookmarkXIcon;
