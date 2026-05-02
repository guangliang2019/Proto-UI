// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ghost' as const;
export const LUCIDE_GHOST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9 10h.01' }),
  svg.path({ d: 'M15 10h.01' }),
  svg.path({ d: 'M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z' }),
];

export function renderLucideGhostIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GHOST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ghost-icon',
  prototypeName: 'lucide-ghost-icon',
  shapeFactory: LUCIDE_GHOST_SHAPE_FACTORY,
});

export const asLucideGhostIcon = fixed.asHook;
export const lucideGhostIcon = fixed.prototype;
export default lucideGhostIcon;
