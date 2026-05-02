// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-up-down' as const;
export const LUCIDE_CHEVRONS_UP_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 15 5 5 5-5' }),
  svg.path({ d: 'm7 9 5-5 5 5' }),
];

export function renderLucideChevronsUpDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_UP_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-up-down-icon',
  prototypeName: 'lucide-chevrons-up-down-icon',
  shapeFactory: LUCIDE_CHEVRONS_UP_DOWN_SHAPE_FACTORY,
});

export const asLucideChevronsUpDownIcon = fixed.asHook;
export const lucideChevronsUpDownIcon = fixed.prototype;
export default lucideChevronsUpDownIcon;
