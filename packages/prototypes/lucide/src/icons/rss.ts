// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rss' as const;
export const LUCIDE_RSS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 11a9 9 0 0 1 9 9' }),
  svg.path({ d: 'M4 4a16 16 0 0 1 16 16' }),
  svg.circle({ cx: 5, cy: 19, r: 1 }),
];

export function renderLucideRssIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RSS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rss-icon',
  prototypeName: 'lucide-rss-icon',
  shapeFactory: LUCIDE_RSS_SHAPE_FACTORY,
});

export const asLucideRssIcon = fixed.asHook;
export const lucideRssIcon = fixed.prototype;
export default lucideRssIcon;
