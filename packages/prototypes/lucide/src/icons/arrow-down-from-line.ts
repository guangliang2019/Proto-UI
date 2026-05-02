// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-from-line' as const;
export const LUCIDE_ARROW_DOWN_FROM_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 3H5' }),
  svg.path({ d: 'M12 21V7' }),
  svg.path({ d: 'm6 15 6 6 6-6' }),
];

export function renderLucideArrowDownFromLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_FROM_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-from-line-icon',
  prototypeName: 'lucide-arrow-down-from-line-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_FROM_LINE_SHAPE_FACTORY,
});

export const asLucideArrowDownFromLineIcon = fixed.asHook;
export const lucideArrowDownFromLineIcon = fixed.prototype;
export default lucideArrowDownFromLineIcon;
