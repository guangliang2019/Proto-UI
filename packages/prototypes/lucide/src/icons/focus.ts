// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'focus' as const;
export const LUCIDE_FOCUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 3 }),
  svg.path({ d: 'M3 7V5a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M17 3h2a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M21 17v2a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M7 21H5a2 2 0 0 1-2-2v-2' }),
];

export function renderLucideFocusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOCUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-focus-icon',
  prototypeName: 'lucide-focus-icon',
  shapeFactory: LUCIDE_FOCUS_SHAPE_FACTORY,
});

export const asLucideFocusIcon = fixed.asHook;
export const lucideFocusIcon = fixed.prototype;
export default lucideFocusIcon;
