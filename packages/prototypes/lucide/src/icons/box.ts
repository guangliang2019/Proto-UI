// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'box' as const;
export const LUCIDE_BOX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
  }),
  svg.path({ d: 'm3.3 7 8.7 5 8.7-5' }),
  svg.path({ d: 'M12 22V12' }),
];

export function renderLucideBoxIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-box-icon',
  prototypeName: 'lucide-box-icon',
  shapeFactory: LUCIDE_BOX_SHAPE_FACTORY,
});

export const asLucideBoxIcon = fixed.asHook;
export const lucideBoxIcon = fixed.prototype;
export default lucideBoxIcon;
