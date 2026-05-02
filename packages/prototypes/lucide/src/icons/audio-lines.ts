// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'audio-lines' as const;
export const LUCIDE_AUDIO_LINES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 10v3' }),
  svg.path({ d: 'M6 6v11' }),
  svg.path({ d: 'M10 3v18' }),
  svg.path({ d: 'M14 8v7' }),
  svg.path({ d: 'M18 5v13' }),
  svg.path({ d: 'M22 10v3' }),
];

export function renderLucideAudioLinesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AUDIO_LINES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-audio-lines-icon',
  prototypeName: 'lucide-audio-lines-icon',
  shapeFactory: LUCIDE_AUDIO_LINES_SHAPE_FACTORY,
});

export const asLucideAudioLinesIcon = fixed.asHook;
export const lucideAudioLinesIcon = fixed.prototype;
export default lucideAudioLinesIcon;
