// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-left-dashed' as const;
export const LUCIDE_PANEL_LEFT_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 14v1' }),
  svg.path({ d: 'M9 19v2' }),
  svg.path({ d: 'M9 3v2' }),
  svg.path({ d: 'M9 9v1' }),
];

export function renderLucidePanelLeftDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_LEFT_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-left-dashed-icon',
  prototypeName: 'lucide-panel-left-dashed-icon',
  shapeFactory: LUCIDE_PANEL_LEFT_DASHED_SHAPE_FACTORY,
});

export const asLucidePanelLeftDashedIcon = fixed.asHook;
export const lucidePanelLeftDashedIcon = fixed.prototype;
export default lucidePanelLeftDashedIcon;
