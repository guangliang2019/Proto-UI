// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'angry' as const;
export const LUCIDE_ANGRY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M16 16s-1.5-2-4-2-4 2-4 2' }),
  svg.path({ d: 'M7.5 8 10 9' }),
  svg.path({ d: 'm14 9 2.5-1' }),
  svg.path({ d: 'M9 10h.01' }),
  svg.path({ d: 'M15 10h.01' }),
];

export function renderLucideAngryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ANGRY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-angry-icon',
  prototypeName: 'lucide-angry-icon',
  shapeFactory: LUCIDE_ANGRY_SHAPE_FACTORY,
});

export const asLucideAngryIcon = fixed.asHook;
export const lucideAngryIcon = fixed.prototype;
export default lucideAngryIcon;
