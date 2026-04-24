// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ampersands' as const;
export const LUCIDE_AMPERSANDS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5',
  }),
  svg.path({
    d: 'M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5',
  }),
];

export function renderLucideAmpersandsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AMPERSANDS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ampersands-icon',
  prototypeName: 'lucide-ampersands-icon',
  shapeFactory: LUCIDE_AMPERSANDS_SHAPE_FACTORY,
});

export const asLucideAmpersandsIcon = fixed.asHook;
export const lucideAmpersandsIcon = fixed.prototype;
export default lucideAmpersandsIcon;
