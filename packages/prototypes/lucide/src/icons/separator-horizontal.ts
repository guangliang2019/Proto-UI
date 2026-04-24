// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'separator-horizontal' as const;
export const LUCIDE_SEPARATOR_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 16-4 4-4-4' }),
  svg.path({ d: 'M3 12h18' }),
  svg.path({ d: 'm8 8 4-4 4 4' }),
];

export function renderLucideSeparatorHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEPARATOR_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-separator-horizontal-icon',
  prototypeName: 'lucide-separator-horizontal-icon',
  shapeFactory: LUCIDE_SEPARATOR_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideSeparatorHorizontalIcon = fixed.asHook;
export const lucideSeparatorHorizontalIcon = fixed.prototype;
export default lucideSeparatorHorizontalIcon;
