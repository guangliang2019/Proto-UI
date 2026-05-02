// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-up' as const;
export const LUCIDE_CHEVRONS_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 11-5-5-5 5' }),
  svg.path({ d: 'm17 18-5-5-5 5' }),
];

export function renderLucideChevronsUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-up-icon',
  prototypeName: 'lucide-chevrons-up-icon',
  shapeFactory: LUCIDE_CHEVRONS_UP_SHAPE_FACTORY,
});

export const asLucideChevronsUpIcon = fixed.asHook;
export const lucideChevronsUpIcon = fixed.prototype;
export default lucideChevronsUpIcon;
