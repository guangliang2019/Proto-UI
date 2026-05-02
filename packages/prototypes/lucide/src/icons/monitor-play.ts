// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-play' as const;
export const LUCIDE_MONITOR_PLAY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z',
  }),
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'M8 21h8' }),
  svg.rect({ x: 2, y: 3, width: 20, height: 14, rx: 2 }),
];

export function renderLucideMonitorPlayIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_PLAY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-play-icon',
  prototypeName: 'lucide-monitor-play-icon',
  shapeFactory: LUCIDE_MONITOR_PLAY_SHAPE_FACTORY,
});

export const asLucideMonitorPlayIcon = fixed.asHook;
export const lucideMonitorPlayIcon = fixed.prototype;
export default lucideMonitorPlayIcon;
