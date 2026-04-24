// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'funnel-x' as const;
export const LUCIDE_FUNNEL_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473',
  }),
  svg.path({ d: 'm16.5 3.5 5 5' }),
  svg.path({ d: 'm21.5 3.5-5 5' }),
];

export function renderLucideFunnelXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FUNNEL_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-funnel-x-icon',
  prototypeName: 'lucide-funnel-x-icon',
  shapeFactory: LUCIDE_FUNNEL_X_SHAPE_FACTORY,
});

export const asLucideFunnelXIcon = fixed.asHook;
export const lucideFunnelXIcon = fixed.prototype;
export default lucideFunnelXIcon;
