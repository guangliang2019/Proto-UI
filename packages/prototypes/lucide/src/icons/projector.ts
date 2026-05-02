// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'projector' as const;
export const LUCIDE_PROJECTOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 7 3 5' }),
  svg.path({ d: 'M9 6V3' }),
  svg.path({ d: 'm13 7 2-2' }),
  svg.circle({ cx: 9, cy: 13, r: 3 }),
  svg.path({
    d: 'M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17',
  }),
  svg.path({ d: 'M16 16h2' }),
];

export function renderLucideProjectorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PROJECTOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-projector-icon',
  prototypeName: 'lucide-projector-icon',
  shapeFactory: LUCIDE_PROJECTOR_SHAPE_FACTORY,
});

export const asLucideProjectorIcon = fixed.asHook;
export const lucideProjectorIcon = fixed.prototype;
export default lucideProjectorIcon;
