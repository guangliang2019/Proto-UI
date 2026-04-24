// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bean' as const;
export const LUCIDE_BEAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z',
  }),
  svg.path({ d: 'M5.341 10.62a4 4 0 1 0 5.279-5.28' }),
];

export function renderLucideBeanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BEAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bean-icon',
  prototypeName: 'lucide-bean-icon',
  shapeFactory: LUCIDE_BEAN_SHAPE_FACTORY,
});

export const asLucideBeanIcon = fixed.asHook;
export const lucideBeanIcon = fixed.prototype;
export default lucideBeanIcon;
