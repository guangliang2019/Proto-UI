// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'loader-pinwheel' as const;
export const LUCIDE_LOADER_PINWHEEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0' }),
  svg.path({ d: 'M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6' }),
  svg.path({ d: 'M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6' }),
  svg.circle({ cx: 12, cy: 12, r: 10 }),
];

export function renderLucideLoaderPinwheelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOADER_PINWHEEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-loader-pinwheel-icon',
  prototypeName: 'lucide-loader-pinwheel-icon',
  shapeFactory: LUCIDE_LOADER_PINWHEEL_SHAPE_FACTORY,
});

export const asLucideLoaderPinwheelIcon = fixed.asHook;
export const lucideLoaderPinwheelIcon = fixed.prototype;
export default lucideLoaderPinwheelIcon;
