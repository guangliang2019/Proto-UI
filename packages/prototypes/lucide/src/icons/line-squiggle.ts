// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'line-squiggle' as const;
export const LUCIDE_LINE_SQUIGGLE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2',
  });

export function renderLucideLineSquiggleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LINE_SQUIGGLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-line-squiggle-icon',
  prototypeName: 'lucide-line-squiggle-icon',
  shapeFactory: LUCIDE_LINE_SQUIGGLE_SHAPE_FACTORY,
});

export const asLucideLineSquiggleIcon = fixed.asHook;
export const lucideLineSquiggleIcon = fixed.prototype;
export default lucideLineSquiggleIcon;
