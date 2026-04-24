// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lock-keyhole-open' as const;
export const LUCIDE_LOCK_KEYHOLE_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 16, r: 1 }),
  svg.rect({ width: 18, height: 12, x: 3, y: 10, rx: 2 }),
  svg.path({ d: 'M7 10V7a5 5 0 0 1 9.33-2.5' }),
];

export function renderLucideLockKeyholeOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOCK_KEYHOLE_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lock-keyhole-open-icon',
  prototypeName: 'lucide-lock-keyhole-open-icon',
  shapeFactory: LUCIDE_LOCK_KEYHOLE_OPEN_SHAPE_FACTORY,
});

export const asLucideLockKeyholeOpenIcon = fixed.asHook;
export const lucideLockKeyholeOpenIcon = fixed.prototype;
export default lucideLockKeyholeOpenIcon;
