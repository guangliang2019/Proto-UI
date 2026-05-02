// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'share-2' as const;
export const LUCIDE_SHARE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 18, cy: 5, r: 3 }),
  svg.circle({ cx: 6, cy: 12, r: 3 }),
  svg.circle({ cx: 18, cy: 19, r: 3 }),
  svg.line({ x1: 8.59, x2: 15.42, y1: 13.51, y2: 17.49 }),
  svg.line({ x1: 15.41, x2: 8.59, y1: 6.51, y2: 10.49 }),
];

export function renderLucideShare2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHARE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-share-2-icon',
  prototypeName: 'lucide-share-2-icon',
  shapeFactory: LUCIDE_SHARE_2_SHAPE_FACTORY,
});

export const asLucideShare2Icon = fixed.asHook;
export const lucideShare2Icon = fixed.prototype;
export default lucideShare2Icon;
