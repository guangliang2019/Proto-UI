// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'recycle' as const;
export const LUCIDE_RECYCLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5' }),
  svg.path({ d: 'M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12' }),
  svg.path({ d: 'm14 16-3 3 3 3' }),
  svg.path({ d: 'M8.293 13.596 7.196 9.5 3.1 10.598' }),
  svg.path({
    d: 'm9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843',
  }),
  svg.path({ d: 'm13.378 9.633 4.096 1.098 1.097-4.096' }),
];

export function renderLucideRecycleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RECYCLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-recycle-icon',
  prototypeName: 'lucide-recycle-icon',
  shapeFactory: LUCIDE_RECYCLE_SHAPE_FACTORY,
});

export const asLucideRecycleIcon = fixed.asHook;
export const lucideRecycleIcon = fixed.prototype;
export default lucideRecycleIcon;
