// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list' as const;
export const LUCIDE_LIST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5h.01' }),
  svg.path({ d: 'M3 12h.01' }),
  svg.path({ d: 'M3 19h.01' }),
  svg.path({ d: 'M8 5h13' }),
  svg.path({ d: 'M8 12h13' }),
  svg.path({ d: 'M8 19h13' }),
];

export function renderLucideListIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-icon',
  prototypeName: 'lucide-list-icon',
  shapeFactory: LUCIDE_LIST_SHAPE_FACTORY,
});

export const asLucideListIcon = fixed.asHook;
export const lucideListIcon = fixed.prototype;
export default lucideListIcon;
