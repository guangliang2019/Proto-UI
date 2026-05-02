// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'anchor' as const;
export const LUCIDE_ANCHOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v16' }),
  svg.path({ d: 'm19 13 2-1a9 9 0 0 1-18 0l2 1' }),
  svg.path({ d: 'M9 11h6' }),
  svg.circle({ cx: 12, cy: 4, r: 2 }),
];

export function renderLucideAnchorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ANCHOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-anchor-icon',
  prototypeName: 'lucide-anchor-icon',
  shapeFactory: LUCIDE_ANCHOR_SHAPE_FACTORY,
});

export const asLucideAnchorIcon = fixed.asHook;
export const lucideAnchorIcon = fixed.prototype;
export default lucideAnchorIcon;
