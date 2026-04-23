// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'euro' as const;
export const LUCIDE_EURO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 10h12' }),
  svg.path({ d: 'M4 14h9' }),
  svg.path({
    d: 'M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2',
  }),
];

export function renderLucideEuroIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EURO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-euro-icon',
  prototypeName: 'lucide-euro-icon',
  shapeFactory: LUCIDE_EURO_SHAPE_FACTORY,
});

export const asLucideEuroIcon = fixed.asHook;
export const lucideEuroIcon = fixed.prototype;
export default lucideEuroIcon;
