// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'droplet' as const;
export const LUCIDE_DROPLET_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
  });

export function renderLucideDropletIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DROPLET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-droplet-icon',
  prototypeName: 'lucide-droplet-icon',
  shapeFactory: LUCIDE_DROPLET_SHAPE_FACTORY,
});

export const asLucideDropletIcon = fixed.asHook;
export const lucideDropletIcon = fixed.prototype;
export default lucideDropletIcon;
