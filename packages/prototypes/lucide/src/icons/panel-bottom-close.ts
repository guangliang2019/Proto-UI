// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-bottom-close' as const;
export const LUCIDE_PANEL_BOTTOM_CLOSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 15h18' }),
  svg.path({ d: 'm15 8-3 3-3-3' }),
];

export function renderLucidePanelBottomCloseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_BOTTOM_CLOSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-bottom-close-icon',
  prototypeName: 'lucide-panel-bottom-close-icon',
  shapeFactory: LUCIDE_PANEL_BOTTOM_CLOSE_SHAPE_FACTORY,
});

export const asLucidePanelBottomCloseIcon = fixed.asHook;
export const lucidePanelBottomCloseIcon = fixed.prototype;
export default lucidePanelBottomCloseIcon;
