// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'podcast' as const;
export const LUCIDE_PODCAST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z', fill: 'currentColor' }),
  svg.path({ d: 'M16.85 18.58a9 9 0 1 0-9.7 0' }),
  svg.path({ d: 'M8 14a5 5 0 1 1 8 0' }),
  svg.circle({ cx: 12, cy: 11, r: 1, fill: 'currentColor' }),
];

export function renderLucidePodcastIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PODCAST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-podcast-icon',
  prototypeName: 'lucide-podcast-icon',
  shapeFactory: LUCIDE_PODCAST_SHAPE_FACTORY,
});

export const asLucidePodcastIcon = fixed.asHook;
export const lucidePodcastIcon = fixed.prototype;
export default lucidePodcastIcon;
