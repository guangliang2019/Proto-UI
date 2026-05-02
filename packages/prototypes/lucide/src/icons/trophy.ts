// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'trophy' as const;
export const LUCIDE_TROPHY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978' }),
  svg.path({ d: 'M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978' }),
  svg.path({ d: 'M18 9h1.5a1 1 0 0 0 0-5H18' }),
  svg.path({ d: 'M4 22h16' }),
  svg.path({ d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z' }),
  svg.path({ d: 'M6 9H4.5a1 1 0 0 1 0-5H6' }),
];

export function renderLucideTrophyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TROPHY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-trophy-icon',
  prototypeName: 'lucide-trophy-icon',
  shapeFactory: LUCIDE_TROPHY_SHAPE_FACTORY,
});

export const asLucideTrophyIcon = fixed.asHook;
export const lucideTrophyIcon = fixed.prototype;
export default lucideTrophyIcon;
