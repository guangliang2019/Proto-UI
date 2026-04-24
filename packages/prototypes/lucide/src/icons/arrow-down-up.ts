// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down-up' as const;
export const LUCIDE_ARROW_DOWN_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 16 4 4 4-4' }),
  svg.path({ d: 'M7 20V4' }),
  svg.path({ d: 'm21 8-4-4-4 4' }),
  svg.path({ d: 'M17 4v16' }),
];

export function renderLucideArrowDownUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-up-icon',
  prototypeName: 'lucide-arrow-down-up-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_UP_SHAPE_FACTORY,
});

export const asLucideArrowDownUpIcon = fixed.asHook;
export const lucideArrowDownUpIcon = fixed.prototype;
export default lucideArrowDownUpIcon;
