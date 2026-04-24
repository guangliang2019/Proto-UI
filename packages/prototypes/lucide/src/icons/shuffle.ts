// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shuffle' as const;
export const LUCIDE_SHUFFLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm18 14 4 4-4 4' }),
  svg.path({ d: 'm18 2 4 4-4 4' }),
  svg.path({ d: 'M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22' }),
  svg.path({ d: 'M2 6h1.972a4 4 0 0 1 3.6 2.2' }),
  svg.path({ d: 'M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45' }),
];

export function renderLucideShuffleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHUFFLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shuffle-icon',
  prototypeName: 'lucide-shuffle-icon',
  shapeFactory: LUCIDE_SHUFFLE_SHAPE_FACTORY,
});

export const asLucideShuffleIcon = fixed.asHook;
export const lucideShuffleIcon = fixed.prototype;
export default lucideShuffleIcon;
