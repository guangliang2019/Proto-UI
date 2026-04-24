// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dna' as const;
export const LUCIDE_DNA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 16 1.5 1.5' }),
  svg.path({ d: 'm14 8-1.5-1.5' }),
  svg.path({ d: 'M15 2c-1.798 1.998-2.518 3.995-2.807 5.993' }),
  svg.path({ d: 'm16.5 10.5 1 1' }),
  svg.path({ d: 'm17 6-2.891-2.891' }),
  svg.path({ d: 'M2 15c6.667-6 13.333 0 20-6' }),
  svg.path({ d: 'm20 9 .891.891' }),
  svg.path({ d: 'M3.109 14.109 4 15' }),
  svg.path({ d: 'm6.5 12.5 1 1' }),
  svg.path({ d: 'm7 18 2.891 2.891' }),
  svg.path({ d: 'M9 22c1.798-1.998 2.518-3.995 2.807-5.993' }),
];

export function renderLucideDnaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DNA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dna-icon',
  prototypeName: 'lucide-dna-icon',
  shapeFactory: LUCIDE_DNA_SHAPE_FACTORY,
});

export const asLucideDnaIcon = fixed.asHook;
export const lucideDnaIcon = fixed.prototype;
export default lucideDnaIcon;
