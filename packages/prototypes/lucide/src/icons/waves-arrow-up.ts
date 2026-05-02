// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'waves-arrow-up' as const;
export const LUCIDE_WAVES_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v8' }),
  svg.path({
    d: 'M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  }),
  svg.path({
    d: 'M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  }),
  svg.path({ d: 'm8 6 4-4 4 4' }),
];

export function renderLucideWavesArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WAVES_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-waves-arrow-up-icon',
  prototypeName: 'lucide-waves-arrow-up-icon',
  shapeFactory: LUCIDE_WAVES_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideWavesArrowUpIcon = fixed.asHook;
export const lucideWavesArrowUpIcon = fixed.prototype;
export default lucideWavesArrowUpIcon;
