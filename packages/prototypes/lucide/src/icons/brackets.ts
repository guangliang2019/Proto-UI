// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'brackets' as const;
export const LUCIDE_BRACKETS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3' }),
  svg.path({ d: 'M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3' }),
];

export function renderLucideBracketsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRACKETS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-brackets-icon',
  prototypeName: 'lucide-brackets-icon',
  shapeFactory: LUCIDE_BRACKETS_SHAPE_FACTORY,
});

export const asLucideBracketsIcon = fixed.asHook;
export const lucideBracketsIcon = fixed.prototype;
export default lucideBracketsIcon;
