// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'skull' as const;
export const LUCIDE_SKULL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12.5 17-.5-1-.5 1h1z' }),
  svg.path({
    d: 'M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z',
  }),
  svg.circle({ cx: 15, cy: 12, r: 1 }),
  svg.circle({ cx: 9, cy: 12, r: 1 }),
];

export function renderLucideSkullIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SKULL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-skull-icon',
  prototypeName: 'lucide-skull-icon',
  shapeFactory: LUCIDE_SKULL_SHAPE_FACTORY,
});

export const asLucideSkullIcon = fixed.asHook;
export const lucideSkullIcon = fixed.prototype;
export default lucideSkullIcon;
