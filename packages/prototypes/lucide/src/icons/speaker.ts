// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'speaker' as const;
export const LUCIDE_SPEAKER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 16, height: 20, x: 4, y: 2, rx: 2 }),
  svg.path({ d: 'M12 6h.01' }),
  svg.circle({ cx: 12, cy: 14, r: 4 }),
  svg.path({ d: 'M12 14h.01' }),
];

export function renderLucideSpeakerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPEAKER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-speaker-icon',
  prototypeName: 'lucide-speaker-icon',
  shapeFactory: LUCIDE_SPEAKER_SHAPE_FACTORY,
});

export const asLucideSpeakerIcon = fixed.asHook;
export const lucideSpeakerIcon = fixed.prototype;
export default lucideSpeakerIcon;
