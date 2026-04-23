// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lock-open' as const;
export const LUCIDE_LOCK_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
  svg.path({ d: 'M7 11V7a5 5 0 0 1 9.9-1' }),
];

export function renderLucideLockOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOCK_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lock-open-icon',
  prototypeName: 'lucide-lock-open-icon',
  shapeFactory: LUCIDE_LOCK_OPEN_SHAPE_FACTORY,
});

export const asLucideLockOpenIcon = fixed.asHook;
export const lucideLockOpenIcon = fixed.prototype;
export default lucideLockOpenIcon;
