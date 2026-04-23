// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'octagon' as const;
export const LUCIDE_OCTAGON_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z',
  });

export function renderLucideOctagonIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_OCTAGON_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-octagon-icon',
  prototypeName: 'lucide-octagon-icon',
  shapeFactory: LUCIDE_OCTAGON_SHAPE_FACTORY,
});

export const asLucideOctagonIcon = fixed.asHook;
export const lucideOctagonIcon = fixed.prototype;
export default lucideOctagonIcon;
