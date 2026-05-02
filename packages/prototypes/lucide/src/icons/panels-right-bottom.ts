// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panels-right-bottom' as const;
export const LUCIDE_PANELS_RIGHT_BOTTOM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 15h12' }),
  svg.path({ d: 'M15 3v18' }),
];

export function renderLucidePanelsRightBottomIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANELS_RIGHT_BOTTOM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panels-right-bottom-icon',
  prototypeName: 'lucide-panels-right-bottom-icon',
  shapeFactory: LUCIDE_PANELS_RIGHT_BOTTOM_SHAPE_FACTORY,
});

export const asLucidePanelsRightBottomIcon = fixed.asHook;
export const lucidePanelsRightBottomIcon = fixed.prototype;
export default lucidePanelsRightBottomIcon;
