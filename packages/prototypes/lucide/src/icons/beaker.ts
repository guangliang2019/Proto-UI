// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'beaker' as const;
export const LUCIDE_BEAKER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4.5 3h15' }),
  svg.path({ d: 'M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3' }),
  svg.path({ d: 'M6 14h12' }),
];

export function renderLucideBeakerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BEAKER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-beaker-icon',
  prototypeName: 'lucide-beaker-icon',
  shapeFactory: LUCIDE_BEAKER_SHAPE_FACTORY,
});

export const asLucideBeakerIcon = fixed.asHook;
export const lucideBeakerIcon = fixed.prototype;
export default lucideBeakerIcon;
