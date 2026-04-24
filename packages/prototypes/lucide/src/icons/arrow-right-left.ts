// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-right-left' as const;
export const LUCIDE_ARROW_RIGHT_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 3 4 4-4 4' }),
  svg.path({ d: 'M20 7H4' }),
  svg.path({ d: 'm8 21-4-4 4-4' }),
  svg.path({ d: 'M4 17h16' }),
];

export function renderLucideArrowRightLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_RIGHT_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-right-left-icon',
  prototypeName: 'lucide-arrow-right-left-icon',
  shapeFactory: LUCIDE_ARROW_RIGHT_LEFT_SHAPE_FACTORY,
});

export const asLucideArrowRightLeftIcon = fixed.asHook;
export const lucideArrowRightLeftIcon = fixed.prototype;
export default lucideArrowRightLeftIcon;
