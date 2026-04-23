// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-dashed' as const;
export const LUCIDE_CIRCLE_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.1 2.182a10 10 0 0 1 3.8 0' }),
  svg.path({ d: 'M13.9 21.818a10 10 0 0 1-3.8 0' }),
  svg.path({ d: 'M17.609 3.721a10 10 0 0 1 2.69 2.7' }),
  svg.path({ d: 'M2.182 13.9a10 10 0 0 1 0-3.8' }),
  svg.path({ d: 'M20.279 17.609a10 10 0 0 1-2.7 2.69' }),
  svg.path({ d: 'M21.818 10.1a10 10 0 0 1 0 3.8' }),
  svg.path({ d: 'M3.721 6.391a10 10 0 0 1 2.7-2.69' }),
  svg.path({ d: 'M6.391 20.279a10 10 0 0 1-2.69-2.7' }),
];

export function renderLucideCircleDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-dashed-icon',
  prototypeName: 'lucide-circle-dashed-icon',
  shapeFactory: LUCIDE_CIRCLE_DASHED_SHAPE_FACTORY,
});

export const asLucideCircleDashedIcon = fixed.asHook;
export const lucideCircleDashedIcon = fixed.prototype;
export default lucideCircleDashedIcon;
