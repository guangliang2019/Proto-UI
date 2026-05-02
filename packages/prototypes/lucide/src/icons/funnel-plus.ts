// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'funnel-plus' as const;
export const LUCIDE_FUNNEL_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348',
  }),
  svg.path({ d: 'M16 6h6' }),
  svg.path({ d: 'M19 3v6' }),
];

export function renderLucideFunnelPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FUNNEL_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-funnel-plus-icon',
  prototypeName: 'lucide-funnel-plus-icon',
  shapeFactory: LUCIDE_FUNNEL_PLUS_SHAPE_FACTORY,
});

export const asLucideFunnelPlusIcon = fixed.asHook;
export const lucideFunnelPlusIcon = fixed.prototype;
export default lucideFunnelPlusIcon;
