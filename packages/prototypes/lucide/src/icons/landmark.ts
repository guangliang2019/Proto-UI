// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'landmark' as const;
export const LUCIDE_LANDMARK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 18v-7' }),
  svg.path({
    d: 'M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z',
  }),
  svg.path({ d: 'M14 18v-7' }),
  svg.path({ d: 'M18 18v-7' }),
  svg.path({ d: 'M3 22h18' }),
  svg.path({ d: 'M6 18v-7' }),
];

export function renderLucideLandmarkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LANDMARK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-landmark-icon',
  prototypeName: 'lucide-landmark-icon',
  shapeFactory: LUCIDE_LANDMARK_SHAPE_FACTORY,
});

export const asLucideLandmarkIcon = fixed.asHook;
export const lucideLandmarkIcon = fixed.prototype;
export default lucideLandmarkIcon;
