// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-right' as const;
export const LUCIDE_ARROW_DOWN_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 7 10 10' }),
  svg.path({ d: 'M17 7v10H7' }),
];

export function renderLucideArrowDownRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-right-icon',
  prototypeName: 'lucide-arrow-down-right-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_RIGHT_SHAPE_FACTORY,
});

export const asLucideArrowDownRightIcon = fixed.asHook;
export const lucideArrowDownRightIcon = fixed.prototype;
export default lucideArrowDownRightIcon;
