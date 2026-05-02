// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-left' as const;
export const LUCIDE_ARROW_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12 19-7-7 7-7' }),
  svg.path({ d: 'M19 12H5' }),
];

export function renderLucideArrowLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-left-icon',
  prototypeName: 'lucide-arrow-left-icon',
  shapeFactory: LUCIDE_ARROW_LEFT_SHAPE_FACTORY,
});

export const asLucideArrowLeftIcon = fixed.asHook;
export const lucideArrowLeftIcon = fixed.prototype;
export default lucideArrowLeftIcon;
