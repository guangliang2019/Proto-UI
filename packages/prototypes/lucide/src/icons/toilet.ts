// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'toilet' as const;
export const LUCIDE_TOILET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18',
  }),
  svg.path({ d: 'M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8' }),
];

export function renderLucideToiletIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOILET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-toilet-icon',
  prototypeName: 'lucide-toilet-icon',
  shapeFactory: LUCIDE_TOILET_SHAPE_FACTORY,
});

export const asLucideToiletIcon = fixed.asHook;
export const lucideToiletIcon = fixed.prototype;
export default lucideToiletIcon;
