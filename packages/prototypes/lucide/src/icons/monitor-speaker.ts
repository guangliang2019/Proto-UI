// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'monitor-speaker' as const;
export const LUCIDE_MONITOR_SPEAKER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5.5 20H8' }),
  svg.path({ d: 'M17 9h.01' }),
  svg.rect({ width: 10, height: 16, x: 12, y: 4, rx: 2 }),
  svg.path({ d: 'M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4' }),
  svg.circle({ cx: 17, cy: 15, r: 1 }),
];

export function renderLucideMonitorSpeakerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MONITOR_SPEAKER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-monitor-speaker-icon',
  prototypeName: 'lucide-monitor-speaker-icon',
  shapeFactory: LUCIDE_MONITOR_SPEAKER_SHAPE_FACTORY,
});

export const asLucideMonitorSpeakerIcon = fixed.asHook;
export const lucideMonitorSpeakerIcon = fixed.prototype;
export default lucideMonitorSpeakerIcon;
