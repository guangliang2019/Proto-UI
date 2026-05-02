// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radical' as const;
export const LUCIDE_RADICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21',
  });

export function renderLucideRadicalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radical-icon',
  prototypeName: 'lucide-radical-icon',
  shapeFactory: LUCIDE_RADICAL_SHAPE_FACTORY,
});

export const asLucideRadicalIcon = fixed.asHook;
export const lucideRadicalIcon = fixed.prototype;
export default lucideRadicalIcon;
