// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'highlighter' as const;
export const LUCIDE_HIGHLIGHTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm9 11-6 6v3h9l3-3' }),
  svg.path({ d: 'm22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4' }),
];

export function renderLucideHighlighterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HIGHLIGHTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-highlighter-icon',
  prototypeName: 'lucide-highlighter-icon',
  shapeFactory: LUCIDE_HIGHLIGHTER_SHAPE_FACTORY,
});

export const asLucideHighlighterIcon = fixed.asHook;
export const lucideHighlighterIcon = fixed.prototype;
export default lucideHighlighterIcon;
