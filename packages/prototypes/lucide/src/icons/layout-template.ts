// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layout-template' as const;
export const LUCIDE_LAYOUT_TEMPLATE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 7, x: 3, y: 3, rx: 1 }),
  svg.rect({ width: 9, height: 7, x: 3, y: 14, rx: 1 }),
  svg.rect({ width: 5, height: 7, x: 16, y: 14, rx: 1 }),
];

export function renderLucideLayoutTemplateIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYOUT_TEMPLATE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layout-template-icon',
  prototypeName: 'lucide-layout-template-icon',
  shapeFactory: LUCIDE_LAYOUT_TEMPLATE_SHAPE_FACTORY,
});

export const asLucideLayoutTemplateIcon = fixed.asHook;
export const lucideLayoutTemplateIcon = fixed.prototype;
export default lucideLayoutTemplateIcon;
