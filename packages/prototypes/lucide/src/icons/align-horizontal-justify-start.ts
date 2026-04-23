// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-justify-start' as const;
export const LUCIDE_ALIGN_HORIZONTAL_JUSTIFY_START_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 14, x: 6, y: 5, rx: 2 }),
  svg.rect({ width: 6, height: 10, x: 16, y: 7, rx: 2 }),
  svg.path({ d: 'M2 2v20' }),
];

export function renderLucideAlignHorizontalJustifyStartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_HORIZONTAL_JUSTIFY_START_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-justify-start-icon',
  prototypeName: 'lucide-align-horizontal-justify-start-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_JUSTIFY_START_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalJustifyStartIcon = fixed.asHook;
export const lucideAlignHorizontalJustifyStartIcon = fixed.prototype;
export default lucideAlignHorizontalJustifyStartIcon;
