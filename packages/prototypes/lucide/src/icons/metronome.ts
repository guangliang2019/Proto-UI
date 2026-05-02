// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'metronome' as const;
export const LUCIDE_METRONOME_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 11.4V9.1' }),
  svg.path({ d: 'm12 17 6.59-6.59' }),
  svg.path({
    d: 'm15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2',
  }),
  svg.circle({ cx: 20, cy: 9, r: 2 }),
];

export function renderLucideMetronomeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_METRONOME_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-metronome-icon',
  prototypeName: 'lucide-metronome-icon',
  shapeFactory: LUCIDE_METRONOME_SHAPE_FACTORY,
});

export const asLucideMetronomeIcon = fixed.asHook;
export const lucideMetronomeIcon = fixed.prototype;
export default lucideMetronomeIcon;
