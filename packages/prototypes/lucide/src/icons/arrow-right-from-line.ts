// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-right-from-line' as const;
export const LUCIDE_ARROW_RIGHT_FROM_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5v14' }),
  svg.path({ d: 'M21 12H7' }),
  svg.path({ d: 'm15 18 6-6-6-6' }),
];

export function renderLucideArrowRightFromLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_RIGHT_FROM_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-right-from-line-icon',
  prototypeName: 'lucide-arrow-right-from-line-icon',
  shapeFactory: LUCIDE_ARROW_RIGHT_FROM_LINE_SHAPE_FACTORY,
});

export const asLucideArrowRightFromLineIcon = fixed.asHook;
export const lucideArrowRightFromLineIcon = fixed.prototype;
export default lucideArrowRightFromLineIcon;
