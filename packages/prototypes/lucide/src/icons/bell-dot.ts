// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bell-dot' as const;
export const LUCIDE_BELL_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.268 21a2 2 0 0 0 3.464 0' }),
  svg.path({
    d: 'M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348',
  }),
  svg.circle({ cx: 18, cy: 5, r: 3 }),
];

export function renderLucideBellDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BELL_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bell-dot-icon',
  prototypeName: 'lucide-bell-dot-icon',
  shapeFactory: LUCIDE_BELL_DOT_SHAPE_FACTORY,
});

export const asLucideBellDotIcon = fixed.asHook;
export const lucideBellDotIcon = fixed.prototype;
export default lucideBellDotIcon;
