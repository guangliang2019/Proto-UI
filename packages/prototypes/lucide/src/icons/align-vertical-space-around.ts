// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-vertical-space-around' as const;
export const LUCIDE_ALIGN_VERTICAL_SPACE_AROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 10, height: 6, x: 7, y: 9, rx: 2 }),
  svg.path({ d: 'M22 20H2' }),
  svg.path({ d: 'M22 4H2' }),
];

export function renderLucideAlignVerticalSpaceAroundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_VERTICAL_SPACE_AROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-vertical-space-around-icon',
  prototypeName: 'lucide-align-vertical-space-around-icon',
  shapeFactory: LUCIDE_ALIGN_VERTICAL_SPACE_AROUND_SHAPE_FACTORY,
});

export const asLucideAlignVerticalSpaceAroundIcon = fixed.asHook;
export const lucideAlignVerticalSpaceAroundIcon = fixed.prototype;
export default lucideAlignVerticalSpaceAroundIcon;
