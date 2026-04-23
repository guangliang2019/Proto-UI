// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wand' as const;
export const LUCIDE_WAND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 4V2' }),
  svg.path({ d: 'M15 16v-2' }),
  svg.path({ d: 'M8 9h2' }),
  svg.path({ d: 'M20 9h2' }),
  svg.path({ d: 'M17.8 11.8 19 13' }),
  svg.path({ d: 'M15 9h.01' }),
  svg.path({ d: 'M17.8 6.2 19 5' }),
  svg.path({ d: 'm3 21 9-9' }),
  svg.path({ d: 'M12.2 6.2 11 5' }),
];

export function renderLucideWandIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WAND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wand-icon',
  prototypeName: 'lucide-wand-icon',
  shapeFactory: LUCIDE_WAND_SHAPE_FACTORY,
});

export const asLucideWandIcon = fixed.asHook;
export const lucideWandIcon = fixed.prototype;
export default lucideWandIcon;
