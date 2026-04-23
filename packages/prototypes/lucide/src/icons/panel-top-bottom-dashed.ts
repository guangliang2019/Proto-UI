// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-top-bottom-dashed' as const;
export const LUCIDE_PANEL_TOP_BOTTOM_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 15h1' }),
  svg.path({ d: 'M14 9h1' }),
  svg.path({ d: 'M19 15h2' }),
  svg.path({ d: 'M19 9h2' }),
  svg.path({ d: 'M3 15h2' }),
  svg.path({ d: 'M3 9h2' }),
  svg.path({ d: 'M9 15h1' }),
  svg.path({ d: 'M9 9h1' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucidePanelTopBottomDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_TOP_BOTTOM_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-top-bottom-dashed-icon',
  prototypeName: 'lucide-panel-top-bottom-dashed-icon',
  shapeFactory: LUCIDE_PANEL_TOP_BOTTOM_DASHED_SHAPE_FACTORY,
});

export const asLucidePanelTopBottomDashedIcon = fixed.asHook;
export const lucidePanelTopBottomDashedIcon = fixed.prototype;
export default lucidePanelTopBottomDashedIcon;
