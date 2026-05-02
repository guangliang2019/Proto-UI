// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spray-can' as const;
export const LUCIDE_SPRAY_CAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 3h.01' }),
  svg.path({ d: 'M7 5h.01' }),
  svg.path({ d: 'M11 7h.01' }),
  svg.path({ d: 'M3 7h.01' }),
  svg.path({ d: 'M7 9h.01' }),
  svg.path({ d: 'M3 11h.01' }),
  svg.rect({ width: 4, height: 4, x: 15, y: 5 }),
  svg.path({ d: 'm19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2' }),
  svg.path({ d: 'm13 14 8-2' }),
  svg.path({ d: 'm13 19 8-2' }),
];

export function renderLucideSprayCanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPRAY_CAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spray-can-icon',
  prototypeName: 'lucide-spray-can-icon',
  shapeFactory: LUCIDE_SPRAY_CAN_SHAPE_FACTORY,
});

export const asLucideSprayCanIcon = fixed.asHook;
export const lucideSprayCanIcon = fixed.prototype;
export default lucideSprayCanIcon;
