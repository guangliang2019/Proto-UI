// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-right' as const;
export const LUCIDE_ARROW_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 12h14' }),
  svg.path({ d: 'm12 5 7 7-7 7' }),
];

export function renderLucideArrowRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-right-icon',
  prototypeName: 'lucide-arrow-right-icon',
  shapeFactory: LUCIDE_ARROW_RIGHT_SHAPE_FACTORY,
});

export const asLucideArrowRightIcon = fixed.asHook;
export const lucideArrowRightIcon = fixed.prototype;
export default lucideArrowRightIcon;
