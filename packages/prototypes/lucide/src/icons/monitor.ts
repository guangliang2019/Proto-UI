// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor' as const;
export const LUCIDE_MONITOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
  svg.line({ x1: 8, x2: 16, y1: 21, y2: 21 }),
  svg.line({ x1: 12, x2: 12, y1: 17, y2: 21 }),
];

export function renderLucideMonitorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-icon',
  prototypeName: 'lucide-monitor-icon',
  shapeFactory: LUCIDE_MONITOR_SHAPE_FACTORY,
});

export const asLucideMonitorIcon = fixed.asHook;
export const lucideMonitorIcon = fixed.prototype;
export default lucideMonitorIcon;
