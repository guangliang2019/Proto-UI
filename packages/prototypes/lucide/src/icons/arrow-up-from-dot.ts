// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-from-dot' as const;
export const LUCIDE_ARROW_UP_FROM_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm5 9 7-7 7 7' }),
  svg.path({ d: 'M12 16V2' }),
  svg.circle({ cx: 12, cy: 21, r: 1 }),
];

export function renderLucideArrowUpFromDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_FROM_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-from-dot-icon',
  prototypeName: 'lucide-arrow-up-from-dot-icon',
  shapeFactory: LUCIDE_ARROW_UP_FROM_DOT_SHAPE_FACTORY,
});

export const asLucideArrowUpFromDotIcon = fixed.asHook;
export const lucideArrowUpFromDotIcon = fixed.prototype;
export default lucideArrowUpFromDotIcon;
