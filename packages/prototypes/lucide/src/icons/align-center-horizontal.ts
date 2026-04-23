// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-center-horizontal' as const;
export const LUCIDE_ALIGN_CENTER_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 12h20' }),
  svg.path({ d: 'M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4' }),
  svg.path({ d: 'M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4' }),
  svg.path({ d: 'M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1' }),
  svg.path({ d: 'M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1' }),
];

export function renderLucideAlignCenterHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_CENTER_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-center-horizontal-icon',
  prototypeName: 'lucide-align-center-horizontal-icon',
  shapeFactory: LUCIDE_ALIGN_CENTER_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideAlignCenterHorizontalIcon = fixed.asHook;
export const lucideAlignCenterHorizontalIcon = fixed.prototype;
export default lucideAlignCenterHorizontalIcon;
