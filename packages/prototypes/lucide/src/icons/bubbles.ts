// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bubbles' as const;
export const LUCIDE_BUBBLES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7.001 15.085A1.5 1.5 0 0 1 9 16.5' }),
  svg.circle({ cx: 18.5, cy: 8.5, r: 3.5 }),
  svg.circle({ cx: 7.5, cy: 16.5, r: 5.5 }),
  svg.circle({ cx: 7.5, cy: 4.5, r: 2.5 }),
];

export function renderLucideBubblesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BUBBLES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bubbles-icon',
  prototypeName: 'lucide-bubbles-icon',
  shapeFactory: LUCIDE_BUBBLES_SHAPE_FACTORY,
});

export const asLucideBubblesIcon = fixed.asHook;
export const lucideBubblesIcon = fixed.prototype;
export default lucideBubblesIcon;
