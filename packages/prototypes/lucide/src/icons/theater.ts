// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'theater' as const;
export const LUCIDE_THEATER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 10s3-3 3-8' }),
  svg.path({ d: 'M22 10s-3-3-3-8' }),
  svg.path({ d: 'M10 2c0 4.4-3.6 8-8 8' }),
  svg.path({ d: 'M14 2c0 4.4 3.6 8 8 8' }),
  svg.path({ d: 'M2 10s2 2 2 5' }),
  svg.path({ d: 'M22 10s-2 2-2 5' }),
  svg.path({ d: 'M8 15h8' }),
  svg.path({ d: 'M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1' }),
  svg.path({ d: 'M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1' }),
];

export function renderLucideTheaterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_THEATER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-theater-icon',
  prototypeName: 'lucide-theater-icon',
  shapeFactory: LUCIDE_THEATER_SHAPE_FACTORY,
});

export const asLucideTheaterIcon = fixed.asHook;
export const lucideTheaterIcon = fixed.prototype;
export default lucideTheaterIcon;
