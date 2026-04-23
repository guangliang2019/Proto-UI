// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-right-close' as const;
export const LUCIDE_PANEL_RIGHT_CLOSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M15 3v18' }),
  svg.path({ d: 'm8 9 3 3-3 3' }),
];

export function renderLucidePanelRightCloseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_RIGHT_CLOSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-right-close-icon',
  prototypeName: 'lucide-panel-right-close-icon',
  shapeFactory: LUCIDE_PANEL_RIGHT_CLOSE_SHAPE_FACTORY,
});

export const asLucidePanelRightCloseIcon = fixed.asHook;
export const lucidePanelRightCloseIcon = fixed.prototype;
export default lucidePanelRightCloseIcon;
