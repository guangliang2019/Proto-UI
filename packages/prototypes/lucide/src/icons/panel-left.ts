// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-left' as const;
export const LUCIDE_PANEL_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 3v18' }),
];

export function renderLucidePanelLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-left-icon',
  prototypeName: 'lucide-panel-left-icon',
  shapeFactory: LUCIDE_PANEL_LEFT_SHAPE_FACTORY,
});

export const asLucidePanelLeftIcon = fixed.asHook;
export const lucidePanelLeftIcon = fixed.prototype;
export default lucidePanelLeftIcon;
