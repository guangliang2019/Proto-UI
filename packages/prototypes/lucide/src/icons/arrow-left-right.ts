// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-left-right' as const;
export const LUCIDE_ARROW_LEFT_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 3 4 7l4 4' }),
  svg.path({ d: 'M4 7h16' }),
  svg.path({ d: 'm16 21 4-4-4-4' }),
  svg.path({ d: 'M20 17H4' }),
];

export function renderLucideArrowLeftRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_LEFT_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-left-right-icon',
  prototypeName: 'lucide-arrow-left-right-icon',
  shapeFactory: LUCIDE_ARROW_LEFT_RIGHT_SHAPE_FACTORY,
});

export const asLucideArrowLeftRightIcon = fixed.asHook;
export const lucideArrowLeftRightIcon = fixed.prototype;
export default lucideArrowLeftRightIcon;
