// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-big-up-dash' as const;
export const LUCIDE_ARROW_BIG_UP_DASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z',
  }),
  svg.path({ d: 'M9 20h6' }),
];

export function renderLucideArrowBigUpDashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_BIG_UP_DASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-big-up-dash-icon',
  prototypeName: 'lucide-arrow-big-up-dash-icon',
  shapeFactory: LUCIDE_ARROW_BIG_UP_DASH_SHAPE_FACTORY,
});

export const asLucideArrowBigUpDashIcon = fixed.asHook;
export const lucideArrowBigUpDashIcon = fixed.prototype;
export default lucideArrowBigUpDashIcon;
