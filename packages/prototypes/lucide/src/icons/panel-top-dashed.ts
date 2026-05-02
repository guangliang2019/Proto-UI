// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-top-dashed' as const;
export const LUCIDE_PANEL_TOP_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M14 9h1' }),
  svg.path({ d: 'M19 9h2' }),
  svg.path({ d: 'M3 9h2' }),
  svg.path({ d: 'M9 9h1' }),
];

export function renderLucidePanelTopDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_TOP_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-top-dashed-icon',
  prototypeName: 'lucide-panel-top-dashed-icon',
  shapeFactory: LUCIDE_PANEL_TOP_DASHED_SHAPE_FACTORY,
});

export const asLucidePanelTopDashedIcon = fixed.asHook;
export const lucidePanelTopDashedIcon = fixed.prototype;
export default lucidePanelTopDashedIcon;
