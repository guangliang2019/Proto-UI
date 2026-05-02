// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heater' as const;
export const LUCIDE_HEATER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 8c2-3-2-3 0-6' }),
  svg.path({ d: 'M15.5 8c2-3-2-3 0-6' }),
  svg.path({ d: 'M6 10h.01' }),
  svg.path({ d: 'M6 14h.01' }),
  svg.path({ d: 'M10 16v-4' }),
  svg.path({ d: 'M14 16v-4' }),
  svg.path({ d: 'M18 16v-4' }),
  svg.path({ d: 'M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3' }),
  svg.path({ d: 'M5 20v2' }),
  svg.path({ d: 'M19 20v2' }),
];

export function renderLucideHeaterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEATER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heater-icon',
  prototypeName: 'lucide-heater-icon',
  shapeFactory: LUCIDE_HEATER_SHAPE_FACTORY,
});

export const asLucideHeaterIcon = fixed.asHook;
export const lucideHeaterIcon = fixed.prototype;
export default lucideHeaterIcon;
