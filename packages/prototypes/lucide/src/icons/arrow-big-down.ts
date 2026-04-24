// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-big-down' as const;
export const LUCIDE_ARROW_BIG_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z',
  });

export function renderLucideArrowBigDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_BIG_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-big-down-icon',
  prototypeName: 'lucide-arrow-big-down-icon',
  shapeFactory: LUCIDE_ARROW_BIG_DOWN_SHAPE_FACTORY,
});

export const asLucideArrowBigDownIcon = fixed.asHook;
export const lucideArrowBigDownIcon = fixed.prototype;
export default lucideArrowBigDownIcon;
