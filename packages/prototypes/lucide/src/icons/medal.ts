// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'medal' as const;
export const LUCIDE_MEDAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15',
  }),
  svg.path({ d: 'M11 12 5.12 2.2' }),
  svg.path({ d: 'm13 12 5.88-9.8' }),
  svg.path({ d: 'M8 7h8' }),
  svg.circle({ cx: 12, cy: 17, r: 5 }),
  svg.path({ d: 'M12 18v-2h-.5' }),
];

export function renderLucideMedalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MEDAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-medal-icon',
  prototypeName: 'lucide-medal-icon',
  shapeFactory: LUCIDE_MEDAL_SHAPE_FACTORY,
});

export const asLucideMedalIcon = fixed.asHook;
export const lucideMedalIcon = fixed.prototype;
export default lucideMedalIcon;
