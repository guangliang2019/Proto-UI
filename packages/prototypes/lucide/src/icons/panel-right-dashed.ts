// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panel-right-dashed' as const;
export const LUCIDE_PANEL_RIGHT_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M15 14v1' }),
  svg.path({ d: 'M15 19v2' }),
  svg.path({ d: 'M15 3v2' }),
  svg.path({ d: 'M15 9v1' }),
];

export function renderLucidePanelRightDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANEL_RIGHT_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panel-right-dashed-icon',
  prototypeName: 'lucide-panel-right-dashed-icon',
  shapeFactory: LUCIDE_PANEL_RIGHT_DASHED_SHAPE_FACTORY,
});

export const asLucidePanelRightDashedIcon = fixed.asHook;
export const lucidePanelRightDashedIcon = fixed.prototype;
export default lucidePanelRightDashedIcon;
