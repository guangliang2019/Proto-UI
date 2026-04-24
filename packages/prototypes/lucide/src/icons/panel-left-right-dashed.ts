// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-left-right-dashed' as const;
export const LUCIDE_PANEL_LEFT_RIGHT_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 10V9' }),
  svg.path({ d: 'M15 15v-1' }),
  svg.path({ d: 'M15 21v-2' }),
  svg.path({ d: 'M15 5V3' }),
  svg.path({ d: 'M9 10V9' }),
  svg.path({ d: 'M9 15v-1' }),
  svg.path({ d: 'M9 21v-2' }),
  svg.path({ d: 'M9 5V3' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucidePanelLeftRightDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_LEFT_RIGHT_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-left-right-dashed-icon',
  prototypeName: 'lucide-panel-left-right-dashed-icon',
  shapeFactory: LUCIDE_PANEL_LEFT_RIGHT_DASHED_SHAPE_FACTORY,
});

export const asLucidePanelLeftRightDashedIcon = fixed.asHook;
export const lucidePanelLeftRightDashedIcon = fixed.prototype;
export default lucidePanelLeftRightDashedIcon;
