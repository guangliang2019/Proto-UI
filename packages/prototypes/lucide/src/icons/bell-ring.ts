// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bell-ring' as const;
export const LUCIDE_BELL_RING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.268 21a2 2 0 0 0 3.464 0' }),
  svg.path({ d: 'M22 8c0-2.3-.8-4.3-2-6' }),
  svg.path({
    d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
  }),
  svg.path({ d: 'M4 2C2.8 3.7 2 5.7 2 8' }),
];

export function renderLucideBellRingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BELL_RING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bell-ring-icon',
  prototypeName: 'lucide-bell-ring-icon',
  shapeFactory: LUCIDE_BELL_RING_SHAPE_FACTORY,
});

export const asLucideBellRingIcon = fixed.asHook;
export const lucideBellRingIcon = fixed.prototype;
export default lucideBellRingIcon;
