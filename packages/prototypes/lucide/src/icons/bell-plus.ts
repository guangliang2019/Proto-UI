// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bell-plus' as const;
export const LUCIDE_BELL_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.268 21a2 2 0 0 0 3.464 0' }),
  svg.path({ d: 'M15 8h6' }),
  svg.path({ d: 'M18 5v6' }),
  svg.path({
    d: 'M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332',
  }),
];

export function renderLucideBellPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BELL_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bell-plus-icon',
  prototypeName: 'lucide-bell-plus-icon',
  shapeFactory: LUCIDE_BELL_PLUS_SHAPE_FACTORY,
});

export const asLucideBellPlusIcon = fixed.asHook;
export const lucideBellPlusIcon = fixed.prototype;
export default lucideBellPlusIcon;
