// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'funnel' as const;
export const LUCIDE_FUNNEL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
  });

export function renderLucideFunnelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FUNNEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-funnel-icon',
  prototypeName: 'lucide-funnel-icon',
  shapeFactory: LUCIDE_FUNNEL_SHAPE_FACTORY,
});

export const asLucideFunnelIcon = fixed.asHook;
export const lucideFunnelIcon = fixed.prototype;
export default lucideFunnelIcon;
