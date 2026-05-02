// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-x' as const;
export const LUCIDE_MONITOR_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14.5 12.5-5-5' }),
  svg.path({ d: 'm9.5 12.5 5-5' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
];

export function renderLucideMonitorXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-x-icon',
  prototypeName: 'lucide-monitor-x-icon',
  shapeFactory: LUCIDE_MONITOR_X_SHAPE_FACTORY,
});

export const asLucideMonitorXIcon = fixed.asHook;
export const lucideMonitorXIcon = fixed.prototype;
export default lucideMonitorXIcon;
