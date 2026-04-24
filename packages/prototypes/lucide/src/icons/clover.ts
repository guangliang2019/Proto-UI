// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clover' as const;
export const LUCIDE_CLOVER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16.17 7.83 2 22' }),
  svg.path({
    d: 'M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12',
  }),
  svg.path({ d: 'm7.83 7.83 8.34 8.34' }),
];

export function renderLucideCloverIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOVER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clover-icon',
  prototypeName: 'lucide-clover-icon',
  shapeFactory: LUCIDE_CLOVER_SHAPE_FACTORY,
});

export const asLucideCloverIcon = fixed.asHook;
export const lucideCloverIcon = fixed.prototype;
export default lucideCloverIcon;
