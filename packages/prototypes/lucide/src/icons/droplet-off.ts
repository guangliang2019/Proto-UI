// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'droplet-off' as const;
export const LUCIDE_DROPLET_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586',
  }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208' }),
];

export function renderLucideDropletOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DROPLET_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-droplet-off-icon',
  prototypeName: 'lucide-droplet-off-icon',
  shapeFactory: LUCIDE_DROPLET_OFF_SHAPE_FACTORY,
});

export const asLucideDropletOffIcon = fixed.asHook;
export const lucideDropletOffIcon = fixed.prototype;
export default lucideDropletOffIcon;
