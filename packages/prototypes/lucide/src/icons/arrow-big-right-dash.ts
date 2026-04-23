// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-big-right-dash' as const;
export const LUCIDE_ARROW_BIG_RIGHT_DASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z',
  }),
  svg.path({ d: 'M4 9v6' }),
];

export function renderLucideArrowBigRightDashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_BIG_RIGHT_DASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-big-right-dash-icon',
  prototypeName: 'lucide-arrow-big-right-dash-icon',
  shapeFactory: LUCIDE_ARROW_BIG_RIGHT_DASH_SHAPE_FACTORY,
});

export const asLucideArrowBigRightDashIcon = fixed.asHook;
export const lucideArrowBigRightDashIcon = fixed.prototype;
export default lucideArrowBigRightDashIcon;
