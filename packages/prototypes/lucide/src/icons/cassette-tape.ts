// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cassette-tape' as const;
export const LUCIDE_CASSETTE_TAPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.circle({ cx: 8, cy: 10, r: 2 }),
  svg.path({ d: 'M8 12h8' }),
  svg.circle({ cx: 16, cy: 10, r: 2 }),
  svg.path({ d: 'm6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3' }),
];

export function renderLucideCassetteTapeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CASSETTE_TAPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cassette-tape-icon',
  prototypeName: 'lucide-cassette-tape-icon',
  shapeFactory: LUCIDE_CASSETTE_TAPE_SHAPE_FACTORY,
});

export const asLucideCassetteTapeIcon = fixed.asHook;
export const lucideCassetteTapeIcon = fixed.prototype;
export default lucideCassetteTapeIcon;
