// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bell-off' as const;
export const LUCIDE_BELL_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.268 21a2 2 0 0 0 3.464 0' }),
  svg.path({ d: 'M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05' }),
];

export function renderLucideBellOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BELL_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bell-off-icon',
  prototypeName: 'lucide-bell-off-icon',
  shapeFactory: LUCIDE_BELL_OFF_SHAPE_FACTORY,
});

export const asLucideBellOffIcon = fixed.asHook;
export const lucideBellOffIcon = fixed.prototype;
export default lucideBellOffIcon;
