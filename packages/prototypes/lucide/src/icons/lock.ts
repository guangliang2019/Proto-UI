// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lock' as const;
export const LUCIDE_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
  svg.path({ d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
];

export function renderLucideLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lock-icon',
  prototypeName: 'lucide-lock-icon',
  shapeFactory: LUCIDE_LOCK_SHAPE_FACTORY,
});

export const asLucideLockIcon = fixed.asHook;
export const lucideLockIcon = fixed.prototype;
export default lucideLockIcon;
