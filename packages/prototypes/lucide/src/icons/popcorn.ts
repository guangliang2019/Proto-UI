// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'popcorn' as const;
export const LUCIDE_POPCORN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4' }),
  svg.path({ d: 'M10 22 9 8' }),
  svg.path({ d: 'm14 22 1-14' }),
  svg.path({
    d: 'M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z',
  }),
];

export function renderLucidePopcornIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POPCORN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-popcorn-icon',
  prototypeName: 'lucide-popcorn-icon',
  shapeFactory: LUCIDE_POPCORN_SHAPE_FACTORY,
});

export const asLucidePopcornIcon = fixed.asHook;
export const lucidePopcornIcon = fixed.prototype;
export default lucidePopcornIcon;
