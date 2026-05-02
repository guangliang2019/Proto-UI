// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shredder' as const;
export const LUCIDE_SHREDDER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M10 22v-5' }),
  svg.path({ d: 'M14 19v-2' }),
  svg.path({ d: 'M18 20v-3' }),
  svg.path({ d: 'M2 13h20' }),
  svg.path({ d: 'M6 20v-3' }),
];

export function renderLucideShredderIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHREDDER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shredder-icon',
  prototypeName: 'lucide-shredder-icon',
  shapeFactory: LUCIDE_SHREDDER_SHAPE_FACTORY,
});

export const asLucideShredderIcon = fixed.asHook;
export const lucideShredderIcon = fixed.prototype;
export default lucideShredderIcon;
