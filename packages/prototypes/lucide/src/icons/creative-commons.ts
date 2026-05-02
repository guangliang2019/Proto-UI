// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'creative-commons' as const;
export const LUCIDE_CREATIVE_COMMONS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1' }),
  svg.path({ d: 'M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1' }),
];

export function renderLucideCreativeCommonsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CREATIVE_COMMONS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-creative-commons-icon',
  prototypeName: 'lucide-creative-commons-icon',
  shapeFactory: LUCIDE_CREATIVE_COMMONS_SHAPE_FACTORY,
});

export const asLucideCreativeCommonsIcon = fixed.asHook;
export const lucideCreativeCommonsIcon = fixed.prototype;
export default lucideCreativeCommonsIcon;
