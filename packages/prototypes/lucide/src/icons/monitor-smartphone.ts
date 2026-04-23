// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-smartphone' as const;
export const LUCIDE_MONITOR_SMARTPHONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8' }),
  svg.path({ d: 'M10 19v-3.96 3.15' }),
  svg.path({ d: 'M7 19h5' }),
  svg.rect({ width: 6, height: 10, x: 16, y: 12, rx: 2 }),
];

export function renderLucideMonitorSmartphoneIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_SMARTPHONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-smartphone-icon',
  prototypeName: 'lucide-monitor-smartphone-icon',
  shapeFactory: LUCIDE_MONITOR_SMARTPHONE_SHAPE_FACTORY,
});

export const asLucideMonitorSmartphoneIcon = fixed.asHook;
export const lucideMonitorSmartphoneIcon = fixed.prototype;
export default lucideMonitorSmartphoneIcon;
