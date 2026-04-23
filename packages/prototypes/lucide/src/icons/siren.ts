// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'siren' as const;
export const LUCIDE_SIREN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 18v-6a5 5 0 1 1 10 0v6' }),
  svg.path({ d: 'M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z' }),
  svg.path({ d: 'M21 12h1' }),
  svg.path({ d: 'M18.5 4.5 18 5' }),
  svg.path({ d: 'M2 12h1' }),
  svg.path({ d: 'M12 2v1' }),
  svg.path({ d: 'm4.929 4.929.707.707' }),
  svg.path({ d: 'M12 12v6' }),
];

export function renderLucideSirenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIREN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-siren-icon',
  prototypeName: 'lucide-siren-icon',
  shapeFactory: LUCIDE_SIREN_SHAPE_FACTORY,
});

export const asLucideSirenIcon = fixed.asHook;
export const lucideSirenIcon = fixed.prototype;
export default lucideSirenIcon;
