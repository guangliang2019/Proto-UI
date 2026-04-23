// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-down' as const;
export const LUCIDE_ARROW_UP_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm21 16-4 4-4-4' }),
  svg.path({ d: 'M17 20V4' }),
  svg.path({ d: 'm3 8 4-4 4 4' }),
  svg.path({ d: 'M7 4v16' }),
];

export function renderLucideArrowUpDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-down-icon',
  prototypeName: 'lucide-arrow-up-down-icon',
  shapeFactory: LUCIDE_ARROW_UP_DOWN_SHAPE_FACTORY,
});

export const asLucideArrowUpDownIcon = fixed.asHook;
export const lucideArrowUpDownIcon = fixed.prototype;
export default lucideArrowUpDownIcon;
