// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'skip-back' as const;
export const LUCIDE_SKIP_BACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z',
  }),
  svg.path({ d: 'M3 20V4' }),
];

export function renderLucideSkipBackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SKIP_BACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-skip-back-icon',
  prototypeName: 'lucide-skip-back-icon',
  shapeFactory: LUCIDE_SKIP_BACK_SHAPE_FACTORY,
});

export const asLucideSkipBackIcon = fixed.asHook;
export const lucideSkipBackIcon = fixed.prototype;
export default lucideSkipBackIcon;
