// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-a-z' as const;
export const LUCIDE_ARROW_UP_A_Z_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 8 4-4 4 4' }),
  svg.path({ d: 'M7 4v16' }),
  svg.path({ d: 'M20 8h-5' }),
  svg.path({ d: 'M15 10V6.5a2.5 2.5 0 0 1 5 0V10' }),
  svg.path({ d: 'M15 14h5l-5 6h5' }),
];

export function renderLucideArrowUpAZIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_A_Z_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-a-z-icon',
  prototypeName: 'lucide-arrow-up-a-z-icon',
  shapeFactory: LUCIDE_ARROW_UP_A_Z_SHAPE_FACTORY,
});

export const asLucideArrowUpAZIcon = fixed.asHook;
export const lucideArrowUpAZIcon = fixed.prototype;
export default lucideArrowUpAZIcon;
