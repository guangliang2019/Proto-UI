// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'align-start-vertical' as const;
export const LUCIDE_ALIGN_START_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 9, height: 6, x: 6, y: 14, rx: 2 }),
  svg.rect({ width: 16, height: 6, x: 6, y: 4, rx: 2 }),
  svg.path({ d: 'M2 2v20' }),
];

export function renderLucideAlignStartVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ALIGN_START_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-align-start-vertical-icon',
  prototypeName: 'lucide-align-start-vertical-icon',
  shapeFactory: LUCIDE_ALIGN_START_VERTICAL_SHAPE_FACTORY,
});

export const asLucideAlignStartVerticalIcon = fixed.asHook;
export const lucideAlignStartVerticalIcon = fixed.prototype;
export default lucideAlignStartVerticalIcon;
