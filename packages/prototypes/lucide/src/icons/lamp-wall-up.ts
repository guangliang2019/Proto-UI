// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lamp-wall-up' as const;
export const LUCIDE_LAMP_WALL_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z',
  }),
  svg.path({ d: 'M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z' }),
  svg.path({ d: 'M8 18h4a2 2 0 0 0 2-2v-5' }),
];

export function renderLucideLampWallUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAMP_WALL_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lamp-wall-up-icon',
  prototypeName: 'lucide-lamp-wall-up-icon',
  shapeFactory: LUCIDE_LAMP_WALL_UP_SHAPE_FACTORY,
});

export const asLucideLampWallUpIcon = fixed.asHook;
export const lucideLampWallUpIcon = fixed.prototype;
export default lucideLampWallUpIcon;
