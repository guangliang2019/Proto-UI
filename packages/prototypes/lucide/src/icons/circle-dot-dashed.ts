// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-dot-dashed' as const;
export const LUCIDE_CIRCLE_DOT_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.1 2.18a9.93 9.93 0 0 1 3.8 0' }),
  svg.path({ d: 'M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7' }),
  svg.path({ d: 'M21.82 10.1a9.93 9.93 0 0 1 0 3.8' }),
  svg.path({ d: 'M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69' }),
  svg.path({ d: 'M13.9 21.82a9.94 9.94 0 0 1-3.8 0' }),
  svg.path({ d: 'M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7' }),
  svg.path({ d: 'M2.18 13.9a9.93 9.93 0 0 1 0-3.8' }),
  svg.path({ d: 'M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69' }),
  svg.circle({ cx: 12, cy: 12, r: 1 }),
];

export function renderLucideCircleDotDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_DOT_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-dot-dashed-icon',
  prototypeName: 'lucide-circle-dot-dashed-icon',
  shapeFactory: LUCIDE_CIRCLE_DOT_DASHED_SHAPE_FACTORY,
});

export const asLucideCircleDotDashedIcon = fixed.asHook;
export const lucideCircleDotDashedIcon = fixed.prototype;
export default lucideCircleDotDashedIcon;
