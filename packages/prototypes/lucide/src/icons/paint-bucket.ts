// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'paint-bucket' as const;
export const LUCIDE_PAINT_BUCKET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 7 6 2' }),
  svg.path({ d: 'M18.992 12H2.041' }),
  svg.path({
    d: 'M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595',
  }),
  svg.path({
    d: 'm8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33',
  }),
];

export function renderLucidePaintBucketIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PAINT_BUCKET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-paint-bucket-icon',
  prototypeName: 'lucide-paint-bucket-icon',
  shapeFactory: LUCIDE_PAINT_BUCKET_SHAPE_FACTORY,
});

export const asLucidePaintBucketIcon = fixed.asHook;
export const lucidePaintBucketIcon = fixed.prototype;
export default lucidePaintBucketIcon;
