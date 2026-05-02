// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'toolbox' as const;
export const LUCIDE_TOOLBOX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 12v4' }),
  svg.path({
    d: 'M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z',
  }),
  svg.path({ d: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' }),
  svg.path({ d: 'M2 14h20' }),
  svg.path({ d: 'M8 12v4' }),
];

export function renderLucideToolboxIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOOLBOX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-toolbox-icon',
  prototypeName: 'lucide-toolbox-icon',
  shapeFactory: LUCIDE_TOOLBOX_SHAPE_FACTORY,
});

export const asLucideToolboxIcon = fixed.asHook;
export const lucideToolboxIcon = fixed.prototype;
export default lucideToolboxIcon;
