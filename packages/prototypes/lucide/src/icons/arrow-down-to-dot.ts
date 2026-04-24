// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-to-dot' as const;
export const LUCIDE_ARROW_DOWN_TO_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v14' }),
  svg.path({ d: 'm19 9-7 7-7-7' }),
  svg.circle({ cx: 12, cy: 21, r: 1 }),
];

export function renderLucideArrowDownToDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_TO_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-to-dot-icon',
  prototypeName: 'lucide-arrow-down-to-dot-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_TO_DOT_SHAPE_FACTORY,
});

export const asLucideArrowDownToDotIcon = fixed.asHook;
export const lucideArrowDownToDotIcon = fixed.prototype;
export default lucideArrowDownToDotIcon;
