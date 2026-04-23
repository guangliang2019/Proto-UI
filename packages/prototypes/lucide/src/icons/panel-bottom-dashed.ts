// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-bottom-dashed' as const;
export const LUCIDE_PANEL_BOTTOM_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M14 15h1' }),
  svg.path({ d: 'M19 15h2' }),
  svg.path({ d: 'M3 15h2' }),
  svg.path({ d: 'M9 15h1' }),
];

export function renderLucidePanelBottomDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_BOTTOM_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-bottom-dashed-icon',
  prototypeName: 'lucide-panel-bottom-dashed-icon',
  shapeFactory: LUCIDE_PANEL_BOTTOM_DASHED_SHAPE_FACTORY,
});

export const asLucidePanelBottomDashedIcon = fixed.asHook;
export const lucidePanelBottomDashedIcon = fixed.prototype;
export default lucidePanelBottomDashedIcon;
