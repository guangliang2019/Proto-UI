// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pilcrow' as const;
export const LUCIDE_PILCROW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 4v16' }),
  svg.path({ d: 'M17 4v16' }),
  svg.path({ d: 'M19 4H9.5a4.5 4.5 0 0 0 0 9H13' }),
];

export function renderLucidePilcrowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PILCROW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pilcrow-icon',
  prototypeName: 'lucide-pilcrow-icon',
  shapeFactory: LUCIDE_PILCROW_SHAPE_FACTORY,
});

export const asLucidePilcrowIcon = fixed.asHook;
export const lucidePilcrowIcon = fixed.prototype;
export default lucidePilcrowIcon;
