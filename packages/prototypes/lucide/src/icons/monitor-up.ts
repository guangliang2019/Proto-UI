// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-up' as const;
export const LUCIDE_MONITOR_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm9 10 3-3 3 3' }),
  svg.path({ d: 'M12 13V7' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
];

export function renderLucideMonitorUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-up-icon',
  prototypeName: 'lucide-monitor-up-icon',
  shapeFactory: LUCIDE_MONITOR_UP_SHAPE_FACTORY,
});

export const asLucideMonitorUpIcon = fixed.asHook;
export const lucideMonitorUpIcon = fixed.prototype;
export default lucideMonitorUpIcon;
