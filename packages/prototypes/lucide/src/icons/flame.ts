// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flame' as const;
export const LUCIDE_FLAME_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4',
  });

export function renderLucideFlameIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLAME_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flame-icon',
  prototypeName: 'lucide-flame-icon',
  shapeFactory: LUCIDE_FLAME_SHAPE_FACTORY,
});

export const asLucideFlameIcon = fixed.asHook;
export const lucideFlameIcon = fixed.prototype;
export default lucideFlameIcon;
