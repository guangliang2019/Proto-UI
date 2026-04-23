// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shower-head' as const;
export const LUCIDE_SHOWER_HEAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm4 4 2.5 2.5' }),
  svg.path({ d: 'M13.5 6.5a4.95 4.95 0 0 0-7 7' }),
  svg.path({ d: 'M15 5 5 15' }),
  svg.path({ d: 'M14 17v.01' }),
  svg.path({ d: 'M10 16v.01' }),
  svg.path({ d: 'M13 13v.01' }),
  svg.path({ d: 'M16 10v.01' }),
  svg.path({ d: 'M11 20v.01' }),
  svg.path({ d: 'M17 14v.01' }),
  svg.path({ d: 'M20 11v.01' }),
];

export function renderLucideShowerHeadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHOWER_HEAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shower-head-icon',
  prototypeName: 'lucide-shower-head-icon',
  shapeFactory: LUCIDE_SHOWER_HEAD_SHAPE_FACTORY,
});

export const asLucideShowerHeadIcon = fixed.asHook;
export const lucideShowerHeadIcon = fixed.prototype;
export default lucideShowerHeadIcon;
