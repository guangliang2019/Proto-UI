// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'indian-rupee' as const;
export const LUCIDE_INDIAN_RUPEE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 3h12' }),
  svg.path({ d: 'M6 8h12' }),
  svg.path({ d: 'm6 13 8.5 8' }),
  svg.path({ d: 'M6 13h3' }),
  svg.path({ d: 'M9 13c6.667 0 6.667-10 0-10' }),
];

export function renderLucideIndianRupeeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_INDIAN_RUPEE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-indian-rupee-icon',
  prototypeName: 'lucide-indian-rupee-icon',
  shapeFactory: LUCIDE_INDIAN_RUPEE_SHAPE_FACTORY,
});

export const asLucideIndianRupeeIcon = fixed.asHook;
export const lucideIndianRupeeIcon = fixed.prototype;
export default lucideIndianRupeeIcon;
