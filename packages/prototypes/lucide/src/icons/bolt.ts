// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bolt' as const;
export const LUCIDE_BOLT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
  }),
  svg.circle({ cx: 12, cy: 12, r: 4 }),
];

export function renderLucideBoltIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOLT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bolt-icon',
  prototypeName: 'lucide-bolt-icon',
  shapeFactory: LUCIDE_BOLT_SHAPE_FACTORY,
});

export const asLucideBoltIcon = fixed.asHook;
export const lucideBoltIcon = fixed.prototype;
export default lucideBoltIcon;
