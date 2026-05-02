// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'omega' as const;
export const LUCIDE_OMEGA_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21',
  });

export function renderLucideOmegaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_OMEGA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-omega-icon',
  prototypeName: 'lucide-omega-icon',
  shapeFactory: LUCIDE_OMEGA_SHAPE_FACTORY,
});

export const asLucideOmegaIcon = fixed.asHook;
export const lucideOmegaIcon = fixed.prototype;
export default lucideOmegaIcon;
