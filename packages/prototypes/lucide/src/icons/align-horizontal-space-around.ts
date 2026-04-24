// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-horizontal-space-around' as const;
export const LUCIDE_ALIGN_HORIZONTAL_SPACE_AROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 6, height: 10, x: 9, y: 7, rx: 2 }),
  svg.path({ d: 'M4 22V2' }),
  svg.path({ d: 'M20 22V2' }),
];

export function renderLucideAlignHorizontalSpaceAroundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_HORIZONTAL_SPACE_AROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-horizontal-space-around-icon',
  prototypeName: 'lucide-align-horizontal-space-around-icon',
  shapeFactory: LUCIDE_ALIGN_HORIZONTAL_SPACE_AROUND_SHAPE_FACTORY,
});

export const asLucideAlignHorizontalSpaceAroundIcon = fixed.asHook;
export const lucideAlignHorizontalSpaceAroundIcon = fixed.prototype;
export default lucideAlignHorizontalSpaceAroundIcon;
