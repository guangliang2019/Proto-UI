// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'earth-lock' as const;
export const LUCIDE_EARTH_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 3.34V5a3 3 0 0 0 3 3' }),
  svg.path({ d: 'M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05' }),
  svg.path({ d: 'M21.54 15H17a2 2 0 0 0-2 2v4.54' }),
  svg.path({ d: 'M12 2a10 10 0 1 0 9.54 13' }),
  svg.path({ d: 'M20 6V4a2 2 0 1 0-4 0v2' }),
  svg.rect({ width: 8, height: 5, x: 14, y: 6, rx: 1 }),
];

export function renderLucideEarthLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EARTH_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-earth-lock-icon',
  prototypeName: 'lucide-earth-lock-icon',
  shapeFactory: LUCIDE_EARTH_LOCK_SHAPE_FACTORY,
});

export const asLucideEarthLockIcon = fixed.asHook;
export const lucideEarthLockIcon = fixed.prototype;
export default lucideEarthLockIcon;
