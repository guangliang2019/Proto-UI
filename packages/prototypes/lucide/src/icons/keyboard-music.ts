// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'keyboard-music' as const;
export const LUCIDE_KEYBOARD_MUSIC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.path({ d: 'M6 8h4' }),
  svg.path({ d: 'M14 8h.01' }),
  svg.path({ d: 'M18 8h.01' }),
  svg.path({ d: 'M2 12h20' }),
  svg.path({ d: 'M6 12v4' }),
  svg.path({ d: 'M10 12v4' }),
  svg.path({ d: 'M14 12v4' }),
  svg.path({ d: 'M18 12v4' }),
];

export function renderLucideKeyboardMusicIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KEYBOARD_MUSIC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-keyboard-music-icon',
  prototypeName: 'lucide-keyboard-music-icon',
  shapeFactory: LUCIDE_KEYBOARD_MUSIC_SHAPE_FACTORY,
});

export const asLucideKeyboardMusicIcon = fixed.asHook;
export const lucideKeyboardMusicIcon = fixed.prototype;
export default lucideKeyboardMusicIcon;
