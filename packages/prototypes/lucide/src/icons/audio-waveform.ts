// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'audio-waveform' as const;
export const LUCIDE_AUDIO_WAVEFORM_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2',
  });

export function renderLucideAudioWaveformIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AUDIO_WAVEFORM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-audio-waveform-icon',
  prototypeName: 'lucide-audio-waveform-icon',
  shapeFactory: LUCIDE_AUDIO_WAVEFORM_SHAPE_FACTORY,
});

export const asLucideAudioWaveformIcon = fixed.asHook;
export const lucideAudioWaveformIcon = fixed.prototype;
export default lucideAudioWaveformIcon;
