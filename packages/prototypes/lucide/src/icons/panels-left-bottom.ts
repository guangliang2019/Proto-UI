// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panels-left-bottom' as const;
export const LUCIDE_PANELS_LEFT_BOTTOM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 3v18' }),
  svg.path({ d: 'M9 15h12' }),
];

export function renderLucidePanelsLeftBottomIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANELS_LEFT_BOTTOM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panels-left-bottom-icon',
  prototypeName: 'lucide-panels-left-bottom-icon',
  shapeFactory: LUCIDE_PANELS_LEFT_BOTTOM_SHAPE_FACTORY,
});

export const asLucidePanelsLeftBottomIcon = fixed.asHook;
export const lucidePanelsLeftBottomIcon = fixed.prototype;
export default lucidePanelsLeftBottomIcon;
