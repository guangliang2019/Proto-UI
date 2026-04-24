// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'beef-off' as const;
export const LUCIDE_BEEF_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12' }),
  svg.path({ d: 'M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04' }),
  svg.path({ d: 'M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5' }),
  svg.path({ d: 'm18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({
    d: 'M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151',
  }),
];

export function renderLucideBeefOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BEEF_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-beef-off-icon',
  prototypeName: 'lucide-beef-off-icon',
  shapeFactory: LUCIDE_BEEF_OFF_SHAPE_FACTORY,
});

export const asLucideBeefOffIcon = fixed.asHook;
export const lucideBeefOffIcon = fixed.prototype;
export default lucideBeefOffIcon;
