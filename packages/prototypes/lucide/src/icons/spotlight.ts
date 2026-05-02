// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spotlight' as const;
export const LUCIDE_SPOTLIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15.295 19.562 16 22' }),
  svg.path({ d: 'm17 16 3.758 2.098' }),
  svg.path({ d: 'm19 12.5 3.026-.598' }),
  svg.path({
    d: 'M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z',
  }),
  svg.path({ d: 'M8 9V2' }),
];

export function renderLucideSpotlightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPOTLIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spotlight-icon',
  prototypeName: 'lucide-spotlight-icon',
  shapeFactory: LUCIDE_SPOTLIGHT_SHAPE_FACTORY,
});

export const asLucideSpotlightIcon = fixed.asHook;
export const lucideSpotlightIcon = fixed.prototype;
export default lucideSpotlightIcon;
