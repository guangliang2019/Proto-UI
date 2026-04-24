// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-up-right' as const;
export const LUCIDE_CORNER_UP_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 14 5-5-5-5' }),
  svg.path({ d: 'M4 20v-7a4 4 0 0 1 4-4h12' }),
];

export function renderLucideCornerUpRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_UP_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-up-right-icon',
  prototypeName: 'lucide-corner-up-right-icon',
  shapeFactory: LUCIDE_CORNER_UP_RIGHT_SHAPE_FACTORY,
});

export const asLucideCornerUpRightIcon = fixed.asHook;
export const lucideCornerUpRightIcon = fixed.prototype;
export default lucideCornerUpRightIcon;
