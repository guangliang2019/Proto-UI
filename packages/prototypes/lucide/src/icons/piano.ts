// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'piano' as const;
export const LUCIDE_PIANO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8',
  }),
  svg.path({ d: 'M2 14h20' }),
  svg.path({ d: 'M6 14v4' }),
  svg.path({ d: 'M10 14v4' }),
  svg.path({ d: 'M14 14v4' }),
  svg.path({ d: 'M18 14v4' }),
];

export function renderLucidePianoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PIANO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-piano-icon',
  prototypeName: 'lucide-piano-icon',
  shapeFactory: LUCIDE_PIANO_SHAPE_FACTORY,
});

export const asLucidePianoIcon = fixed.asHook;
export const lucidePianoIcon = fixed.prototype;
export default lucidePianoIcon;
