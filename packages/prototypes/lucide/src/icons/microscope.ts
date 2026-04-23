// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'microscope' as const;
export const LUCIDE_MICROSCOPE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 18h8' }),
  svg.path({ d: 'M3 22h18' }),
  svg.path({ d: 'M14 22a7 7 0 1 0 0-14h-1' }),
  svg.path({ d: 'M9 14h2' }),
  svg.path({ d: 'M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z' }),
  svg.path({ d: 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' }),
];

export function renderLucideMicroscopeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MICROSCOPE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-microscope-icon',
  prototypeName: 'lucide-microscope-icon',
  shapeFactory: LUCIDE_MICROSCOPE_SHAPE_FACTORY,
});

export const asLucideMicroscopeIcon = fixed.asHook;
export const lucideMicroscopeIcon = fixed.prototype;
export default lucideMicroscopeIcon;
