// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'globe-lock' as const;
export const LUCIDE_GLOBE_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13' }),
  svg.path({ d: 'M2 12h8.5' }),
  svg.path({ d: 'M20 6V4a2 2 0 1 0-4 0v2' }),
  svg.rect({ width: 8, height: 5, x: 14, y: 6, rx: 1 }),
];

export function renderLucideGlobeLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GLOBE_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-globe-lock-icon',
  prototypeName: 'lucide-globe-lock-icon',
  shapeFactory: LUCIDE_GLOBE_LOCK_SHAPE_FACTORY,
});

export const asLucideGlobeLockIcon = fixed.asHook;
export const lucideGlobeLockIcon = fixed.prototype;
export default lucideGlobeLockIcon;
