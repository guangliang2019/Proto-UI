// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'separator-vertical' as const;
export const LUCIDE_SEPARATOR_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v18' }),
  svg.path({ d: 'm16 16 4-4-4-4' }),
  svg.path({ d: 'm8 8-4 4 4 4' }),
];

export function renderLucideSeparatorVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEPARATOR_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-separator-vertical-icon',
  prototypeName: 'lucide-separator-vertical-icon',
  shapeFactory: LUCIDE_SEPARATOR_VERTICAL_SHAPE_FACTORY,
});

export const asLucideSeparatorVerticalIcon = fixed.asHook;
export const lucideSeparatorVerticalIcon = fixed.prototype;
export default lucideSeparatorVerticalIcon;
