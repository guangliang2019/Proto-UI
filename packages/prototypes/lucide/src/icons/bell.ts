// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bell' as const;
export const LUCIDE_BELL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.268 21a2 2 0 0 0 3.464 0' }),
  svg.path({
    d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
  }),
];

export function renderLucideBellIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BELL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bell-icon',
  prototypeName: 'lucide-bell-icon',
  shapeFactory: LUCIDE_BELL_SHAPE_FACTORY,
});

export const asLucideBellIcon = fixed.asHook;
export const lucideBellIcon = fixed.prototype;
export default lucideBellIcon;
