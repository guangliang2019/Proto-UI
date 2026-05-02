// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'antenna' as const;
export const LUCIDE_ANTENNA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 12 7 2' }),
  svg.path({ d: 'm7 12 5-10' }),
  svg.path({ d: 'm12 12 5-10' }),
  svg.path({ d: 'm17 12 5-10' }),
  svg.path({ d: 'M4.5 7h15' }),
  svg.path({ d: 'M12 16v6' }),
];

export function renderLucideAntennaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ANTENNA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-antenna-icon',
  prototypeName: 'lucide-antenna-icon',
  shapeFactory: LUCIDE_ANTENNA_SHAPE_FACTORY,
});

export const asLucideAntennaIcon = fixed.asHook;
export const lucideAntennaIcon = fixed.prototype;
export default lucideAntennaIcon;
