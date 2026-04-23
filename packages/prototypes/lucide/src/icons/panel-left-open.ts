// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-left-open' as const;
export const LUCIDE_PANEL_LEFT_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 3v18' }),
  svg.path({ d: 'm14 9 3 3-3 3' }),
];

export function renderLucidePanelLeftOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_LEFT_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-left-open-icon',
  prototypeName: 'lucide-panel-left-open-icon',
  shapeFactory: LUCIDE_PANEL_LEFT_OPEN_SHAPE_FACTORY,
});

export const asLucidePanelLeftOpenIcon = fixed.asHook;
export const lucidePanelLeftOpenIcon = fixed.prototype;
export default lucidePanelLeftOpenIcon;
