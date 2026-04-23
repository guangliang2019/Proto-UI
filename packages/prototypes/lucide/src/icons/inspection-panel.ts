// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'inspection-panel' as const;
export const LUCIDE_INSPECTION_PANEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 7h.01' }),
  svg.path({ d: 'M17 7h.01' }),
  svg.path({ d: 'M7 17h.01' }),
  svg.path({ d: 'M17 17h.01' }),
];

export function renderLucideInspectionPanelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_INSPECTION_PANEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-inspection-panel-icon',
  prototypeName: 'lucide-inspection-panel-icon',
  shapeFactory: LUCIDE_INSPECTION_PANEL_SHAPE_FACTORY,
});

export const asLucideInspectionPanelIcon = fixed.asHook;
export const lucideInspectionPanelIcon = fixed.prototype;
export default lucideInspectionPanelIcon;
