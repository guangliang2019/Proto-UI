// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-left-close' as const;
export const LUCIDE_PANEL_LEFT_CLOSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 3v18' }),
  svg.path({ d: 'm16 15-3-3 3-3' }),
];

export function renderLucidePanelLeftCloseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_LEFT_CLOSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-left-close-icon',
  prototypeName: 'lucide-panel-left-close-icon',
  shapeFactory: LUCIDE_PANEL_LEFT_CLOSE_SHAPE_FACTORY,
});

export const asLucidePanelLeftCloseIcon = fixed.asHook;
export const lucidePanelLeftCloseIcon = fixed.prototype;
export default lucidePanelLeftCloseIcon;
