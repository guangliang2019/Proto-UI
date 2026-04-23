// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dna-off' as const;
export const LUCIDE_DNA_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8' }),
  svg.path({ d: 'm17 6-2.891-2.891' }),
  svg.path({ d: 'M2 15c3.333-3 6.667-3 10-3' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'm20 9 .891.891' }),
  svg.path({ d: 'M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1' }),
  svg.path({ d: 'M3.109 14.109 4 15' }),
  svg.path({ d: 'm6.5 12.5 1 1' }),
  svg.path({ d: 'm7 18 2.891 2.891' }),
  svg.path({ d: 'M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16' }),
];

export function renderLucideDnaOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DNA_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dna-off-icon',
  prototypeName: 'lucide-dna-off-icon',
  shapeFactory: LUCIDE_DNA_OFF_SHAPE_FACTORY,
});

export const asLucideDnaOffIcon = fixed.asHook;
export const lucideDnaOffIcon = fixed.prototype;
export default lucideDnaOffIcon;
