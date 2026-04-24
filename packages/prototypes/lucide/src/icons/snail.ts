// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'snail' as const;
export const LUCIDE_SNAIL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0' }),
  svg.circle({ cx: 10, cy: 13, r: 8 }),
  svg.path({ d: 'M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6' }),
  svg.path({ d: 'M18 3 19.1 5.2' }),
  svg.path({ d: 'M22 3 20.9 5.2' }),
];

export function renderLucideSnailIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SNAIL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-snail-icon',
  prototypeName: 'lucide-snail-icon',
  shapeFactory: LUCIDE_SNAIL_SHAPE_FACTORY,
});

export const asLucideSnailIcon = fixed.asHook;
export const lucideSnailIcon = fixed.prototype;
export default lucideSnailIcon;
