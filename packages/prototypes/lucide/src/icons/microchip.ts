// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'microchip' as const;
export const LUCIDE_MICROCHIP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12h4' }),
  svg.path({ d: 'M10 17h4' }),
  svg.path({ d: 'M10 7h4' }),
  svg.path({ d: 'M18 12h2' }),
  svg.path({ d: 'M18 18h2' }),
  svg.path({ d: 'M18 6h2' }),
  svg.path({ d: 'M4 12h2' }),
  svg.path({ d: 'M4 18h2' }),
  svg.path({ d: 'M4 6h2' }),
  svg.rect({ x: 6, y: 2, width: 12, height: 20, rx: 2 }),
];

export function renderLucideMicrochipIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MICROCHIP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-microchip-icon',
  prototypeName: 'lucide-microchip-icon',
  shapeFactory: LUCIDE_MICROCHIP_SHAPE_FACTORY,
});

export const asLucideMicrochipIcon = fixed.asHook;
export const lucideMicrochipIcon = fixed.prototype;
export default lucideMicrochipIcon;
