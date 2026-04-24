// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-big-up' as const;
export const LUCIDE_ARROW_BIG_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z',
  });

export function renderLucideArrowBigUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_BIG_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-big-up-icon',
  prototypeName: 'lucide-arrow-big-up-icon',
  shapeFactory: LUCIDE_ARROW_BIG_UP_SHAPE_FACTORY,
});

export const asLucideArrowBigUpIcon = fixed.asHook;
export const lucideArrowBigUpIcon = fixed.prototype;
export default lucideArrowBigUpIcon;
