// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-to-line' as const;
export const LUCIDE_ARROW_DOWN_TO_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 17V3' }),
  svg.path({ d: 'm6 11 6 6 6-6' }),
  svg.path({ d: 'M19 21H5' }),
];

export function renderLucideArrowDownToLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_TO_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-to-line-icon',
  prototypeName: 'lucide-arrow-down-to-line-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_TO_LINE_SHAPE_FACTORY,
});

export const asLucideArrowDownToLineIcon = fixed.asHook;
export const lucideArrowDownToLineIcon = fixed.prototype;
export default lucideArrowDownToLineIcon;
