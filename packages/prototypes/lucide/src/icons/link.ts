// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'link' as const;
export const LUCIDE_LINK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }),
  svg.path({ d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }),
];

export function renderLucideLinkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LINK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-link-icon',
  prototypeName: 'lucide-link-icon',
  shapeFactory: LUCIDE_LINK_SHAPE_FACTORY,
});

export const asLucideLinkIcon = fixed.asHook;
export const lucideLinkIcon = fixed.prototype;
export default lucideLinkIcon;
