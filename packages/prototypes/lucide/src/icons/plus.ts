// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'plus' as const;
export const LUCIDE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 12h14' }),
  svg.path({ d: 'M12 5v14' }),
];

export function renderLucidePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-plus-icon',
  prototypeName: 'lucide-plus-icon',
  shapeFactory: LUCIDE_PLUS_SHAPE_FACTORY,
});

export const asLucidePlusIcon = fixed.asHook;
export const lucidePlusIcon = fixed.prototype;
export default lucidePlusIcon;
