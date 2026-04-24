// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ungroup' as const;
export const LUCIDE_UNGROUP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 8, height: 6, x: 5, y: 4, rx: 1 }),
  svg.rect({ width: 8, height: 6, x: 11, y: 14, rx: 1 }),
];

export function renderLucideUngroupIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNGROUP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ungroup-icon',
  prototypeName: 'lucide-ungroup-icon',
  shapeFactory: LUCIDE_UNGROUP_SHAPE_FACTORY,
});

export const asLucideUngroupIcon = fixed.asHook;
export const lucideUngroupIcon = fixed.prototype;
export default lucideUngroupIcon;
