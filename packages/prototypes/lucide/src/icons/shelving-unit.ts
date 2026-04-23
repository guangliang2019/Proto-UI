// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shelving-unit' as const;
export const LUCIDE_SHELVING_UNIT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' }),
  svg.path({ d: 'M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3' }),
  svg.path({ d: 'M20 22V2' }),
  svg.path({ d: 'M4 12h16' }),
  svg.path({ d: 'M4 20h16' }),
  svg.path({ d: 'M4 2v20' }),
  svg.path({ d: 'M4 4h16' }),
];

export function renderLucideShelvingUnitIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHELVING_UNIT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shelving-unit-icon',
  prototypeName: 'lucide-shelving-unit-icon',
  shapeFactory: LUCIDE_SHELVING_UNIT_SHAPE_FACTORY,
});

export const asLucideShelvingUnitIcon = fixed.asHook;
export const lucideShelvingUnitIcon = fixed.prototype;
export default lucideShelvingUnitIcon;
