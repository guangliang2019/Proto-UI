// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'armchair' as const;
export const LUCIDE_ARMCHAIR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3' }),
  svg.path({
    d: 'M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z',
  }),
  svg.path({ d: 'M5 18v2' }),
  svg.path({ d: 'M19 18v2' }),
];

export function renderLucideArmchairIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARMCHAIR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-armchair-icon',
  prototypeName: 'lucide-armchair-icon',
  shapeFactory: LUCIDE_ARMCHAIR_SHAPE_FACTORY,
});

export const asLucideArmchairIcon = fixed.asHook;
export const lucideArmchairIcon = fixed.prototype;
export default lucideArmchairIcon;
