// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'backpack' as const;
export const LUCIDE_BACKPACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z' }),
  svg.path({ d: 'M8 10h8' }),
  svg.path({ d: 'M8 18h8' }),
  svg.path({ d: 'M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6' }),
  svg.path({ d: 'M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2' }),
];

export function renderLucideBackpackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BACKPACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-backpack-icon',
  prototypeName: 'lucide-backpack-icon',
  shapeFactory: LUCIDE_BACKPACK_SHAPE_FACTORY,
});

export const asLucideBackpackIcon = fixed.asHook;
export const lucideBackpackIcon = fixed.prototype;
export default lucideBackpackIcon;
