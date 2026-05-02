// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-right-open' as const;
export const LUCIDE_PANEL_RIGHT_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M15 3v18' }),
  svg.path({ d: 'm10 15-3-3 3-3' }),
];

export function renderLucidePanelRightOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_RIGHT_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-right-open-icon',
  prototypeName: 'lucide-panel-right-open-icon',
  shapeFactory: LUCIDE_PANEL_RIGHT_OPEN_SHAPE_FACTORY,
});

export const asLucidePanelRightOpenIcon = fixed.asHook;
export const lucidePanelRightOpenIcon = fixed.prototype;
export default lucidePanelRightOpenIcon;
