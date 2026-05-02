// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fence' as const;
export const LUCIDE_FENCE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z' }),
  svg.path({ d: 'M6 8h4' }),
  svg.path({ d: 'M6 18h4' }),
  svg.path({ d: 'm12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z' }),
  svg.path({ d: 'M14 8h4' }),
  svg.path({ d: 'M14 18h4' }),
  svg.path({ d: 'm20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z' }),
];

export function renderLucideFenceIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FENCE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fence-icon',
  prototypeName: 'lucide-fence-icon',
  shapeFactory: LUCIDE_FENCE_SHAPE_FACTORY,
});

export const asLucideFenceIcon = fixed.asHook;
export const lucideFenceIcon = fixed.prototype;
export default lucideFenceIcon;
