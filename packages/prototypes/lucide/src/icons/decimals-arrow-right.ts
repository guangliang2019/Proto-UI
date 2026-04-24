// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'decimals-arrow-right' as const;
export const LUCIDE_DECIMALS_ARROW_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 18h10' }),
  svg.path({ d: 'm17 21 3-3-3-3' }),
  svg.path({ d: 'M3 11h.01' }),
  svg.rect({ x: 15, y: 3, width: 5, height: 8, rx: 2.5 }),
  svg.rect({ x: 6, y: 3, width: 5, height: 8, rx: 2.5 }),
];

export function renderLucideDecimalsArrowRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DECIMALS_ARROW_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-decimals-arrow-right-icon',
  prototypeName: 'lucide-decimals-arrow-right-icon',
  shapeFactory: LUCIDE_DECIMALS_ARROW_RIGHT_SHAPE_FACTORY,
});

export const asLucideDecimalsArrowRightIcon = fixed.asHook;
export const lucideDecimalsArrowRightIcon = fixed.prototype;
export default lucideDecimalsArrowRightIcon;
