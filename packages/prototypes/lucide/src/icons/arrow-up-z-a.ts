// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-z-a' as const;
export const LUCIDE_ARROW_UP_Z_A_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 8 4-4 4 4' }),
  svg.path({ d: 'M7 4v16' }),
  svg.path({ d: 'M15 4h5l-5 6h5' }),
  svg.path({ d: 'M15 20v-3.5a2.5 2.5 0 0 1 5 0V20' }),
  svg.path({ d: 'M20 18h-5' }),
];

export function renderLucideArrowUpZAIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_Z_A_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-z-a-icon',
  prototypeName: 'lucide-arrow-up-z-a-icon',
  shapeFactory: LUCIDE_ARROW_UP_Z_A_SHAPE_FACTORY,
});

export const asLucideArrowUpZAIcon = fixed.asHook;
export const lucideArrowUpZAIcon = fixed.prototype;
export default lucideArrowUpZAIcon;
