// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-right' as const;
export const LUCIDE_ARROW_UP_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 7h10v10' }),
  svg.path({ d: 'M7 17 17 7' }),
];

export function renderLucideArrowUpRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-right-icon',
  prototypeName: 'lucide-arrow-up-right-icon',
  shapeFactory: LUCIDE_ARROW_UP_RIGHT_SHAPE_FACTORY,
});

export const asLucideArrowUpRightIcon = fixed.asHook;
export const lucideArrowUpRightIcon = fixed.prototype;
export default lucideArrowUpRightIcon;
