// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up' as const;
export const LUCIDE_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm5 12 7-7 7 7' }),
  svg.path({ d: 'M12 19V5' }),
];

export function renderLucideArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-icon',
  prototypeName: 'lucide-arrow-up-icon',
  shapeFactory: LUCIDE_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideArrowUpIcon = fixed.asHook;
export const lucideArrowUpIcon = fixed.prototype;
export default lucideArrowUpIcon;
