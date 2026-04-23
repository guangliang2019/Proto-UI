// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'film' as const;
export const LUCIDE_FILM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 3v18' }),
  svg.path({ d: 'M3 7.5h4' }),
  svg.path({ d: 'M3 12h18' }),
  svg.path({ d: 'M3 16.5h4' }),
  svg.path({ d: 'M17 3v18' }),
  svg.path({ d: 'M17 7.5h4' }),
  svg.path({ d: 'M17 16.5h4' }),
];

export function renderLucideFilmIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-film-icon',
  prototypeName: 'lucide-film-icon',
  shapeFactory: LUCIDE_FILM_SHAPE_FACTORY,
});

export const asLucideFilmIcon = fixed.asHook;
export const lucideFilmIcon = fixed.prototype;
export default lucideFilmIcon;
