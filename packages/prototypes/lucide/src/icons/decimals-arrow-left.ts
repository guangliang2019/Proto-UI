// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'decimals-arrow-left' as const;
export const LUCIDE_DECIMALS_ARROW_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm13 21-3-3 3-3' }),
  svg.path({ d: 'M20 18H10' }),
  svg.path({ d: 'M3 11h.01' }),
  svg.rect({ x: 6, y: 3, width: 5, height: 8, rx: 2.5 }),
];

export function renderLucideDecimalsArrowLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DECIMALS_ARROW_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-decimals-arrow-left-icon',
  prototypeName: 'lucide-decimals-arrow-left-icon',
  shapeFactory: LUCIDE_DECIMALS_ARROW_LEFT_SHAPE_FACTORY,
});

export const asLucideDecimalsArrowLeftIcon = fixed.asHook;
export const lucideDecimalsArrowLeftIcon = fixed.prototype;
export default lucideDecimalsArrowLeftIcon;
