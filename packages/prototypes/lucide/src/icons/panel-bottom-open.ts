// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-bottom-open' as const;
export const LUCIDE_PANEL_BOTTOM_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 15h18' }),
  svg.path({ d: 'm9 10 3-3 3 3' }),
];

export function renderLucidePanelBottomOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_BOTTOM_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-bottom-open-icon',
  prototypeName: 'lucide-panel-bottom-open-icon',
  shapeFactory: LUCIDE_PANEL_BOTTOM_OPEN_SHAPE_FACTORY,
});

export const asLucidePanelBottomOpenIcon = fixed.asHook;
export const lucidePanelBottomOpenIcon = fixed.prototype;
export default lucidePanelBottomOpenIcon;
