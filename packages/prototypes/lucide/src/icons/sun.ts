// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sun' as const;
export const LUCIDE_SUN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 4 }),
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M12 20v2' }),
  svg.path({ d: 'm4.93 4.93 1.41 1.41' }),
  svg.path({ d: 'm17.66 17.66 1.41 1.41' }),
  svg.path({ d: 'M2 12h2' }),
  svg.path({ d: 'M20 12h2' }),
  svg.path({ d: 'm6.34 17.66-1.41 1.41' }),
  svg.path({ d: 'm19.07 4.93-1.41 1.41' }),
];

export function renderLucideSunIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sun-icon',
  prototypeName: 'lucide-sun-icon',
  shapeFactory: LUCIDE_SUN_SHAPE_FACTORY,
});

export const asLucideSunIcon = fixed.asHook;
export const lucideSunIcon = fixed.prototype;
export default lucideSunIcon;
