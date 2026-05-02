// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'a-large-small' as const;
export const LUCIDE_A_LARGE_SMALL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16' }),
  svg.path({ d: 'M15.697 14h5.606' }),
  svg.path({ d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16' }),
  svg.path({ d: 'M3.304 13h6.392' }),
];

export function renderLucideALargeSmallIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_A_LARGE_SMALL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-a-large-small-icon',
  prototypeName: 'lucide-a-large-small-icon',
  shapeFactory: LUCIDE_A_LARGE_SMALL_SHAPE_FACTORY,
});

export const asLucideALargeSmallIcon = fixed.asHook;
export const lucideALargeSmallIcon = fixed.prototype;
export default lucideALargeSmallIcon;
