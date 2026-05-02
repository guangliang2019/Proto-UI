// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'skip-forward' as const;
export const LUCIDE_SKIP_FORWARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 4v16' }),
  svg.path({
    d: 'M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z',
  }),
];

export function renderLucideSkipForwardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SKIP_FORWARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-skip-forward-icon',
  prototypeName: 'lucide-skip-forward-icon',
  shapeFactory: LUCIDE_SKIP_FORWARD_SHAPE_FACTORY,
});

export const asLucideSkipForwardIcon = fixed.asHook;
export const lucideSkipForwardIcon = fixed.prototype;
export default lucideSkipForwardIcon;
