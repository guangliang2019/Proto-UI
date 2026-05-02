// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grape' as const;
export const LUCIDE_GRAPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 5V2l-5.89 5.89' }),
  svg.circle({ cx: 16.6, cy: 15.89, r: 3 }),
  svg.circle({ cx: 8.11, cy: 7.4, r: 3 }),
  svg.circle({ cx: 12.35, cy: 11.65, r: 3 }),
  svg.circle({ cx: 13.91, cy: 5.85, r: 3 }),
  svg.circle({ cx: 18.15, cy: 10.09, r: 3 }),
  svg.circle({ cx: 6.56, cy: 13.2, r: 3 }),
  svg.circle({ cx: 10.8, cy: 17.44, r: 3 }),
  svg.circle({ cx: 5, cy: 19, r: 3 }),
];

export function renderLucideGrapeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRAPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grape-icon',
  prototypeName: 'lucide-grape-icon',
  shapeFactory: LUCIDE_GRAPE_SHAPE_FACTORY,
});

export const asLucideGrapeIcon = fixed.asHook;
export const lucideGrapeIcon = fixed.prototype;
export default lucideGrapeIcon;
