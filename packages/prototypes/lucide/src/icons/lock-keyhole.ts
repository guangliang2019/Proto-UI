// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lock-keyhole' as const;
export const LUCIDE_LOCK_KEYHOLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 16, r: 1 }),
  svg.rect({ x: 3, y: 10, width: 18, height: 12, rx: 2 }),
  svg.path({ d: 'M7 10V7a5 5 0 0 1 10 0v3' }),
];

export function renderLucideLockKeyholeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOCK_KEYHOLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lock-keyhole-icon',
  prototypeName: 'lucide-lock-keyhole-icon',
  shapeFactory: LUCIDE_LOCK_KEYHOLE_SHAPE_FACTORY,
});

export const asLucideLockKeyholeIcon = fixed.asHook;
export const lucideLockKeyholeIcon = fixed.prototype;
export default lucideLockKeyholeIcon;
