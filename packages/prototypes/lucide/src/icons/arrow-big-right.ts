// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-big-right' as const;
export const LUCIDE_ARROW_BIG_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z',
  });

export function renderLucideArrowBigRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_BIG_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-big-right-icon',
  prototypeName: 'lucide-arrow-big-right-icon',
  shapeFactory: LUCIDE_ARROW_BIG_RIGHT_SHAPE_FACTORY,
});

export const asLucideArrowBigRightIcon = fixed.asHook;
export const lucideArrowBigRightIcon = fixed.prototype;
export default lucideArrowBigRightIcon;
