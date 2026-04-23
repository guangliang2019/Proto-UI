// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'citrus' as const;
export const LUCIDE_CITRUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z',
  }),
  svg.path({ d: 'M19.65 15.66A8 8 0 0 1 8.35 4.34' }),
  svg.path({ d: 'm14 10-5.5 5.5' }),
  svg.path({ d: 'M14 17.85V10H6.15' }),
];

export function renderLucideCitrusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CITRUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-citrus-icon',
  prototypeName: 'lucide-citrus-icon',
  shapeFactory: LUCIDE_CITRUS_SHAPE_FACTORY,
});

export const asLucideCitrusIcon = fixed.asHook;
export const lucideCitrusIcon = fixed.prototype;
export default lucideCitrusIcon;
