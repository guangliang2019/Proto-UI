// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'panels-top-left' as const;
export const LUCIDE_PANELS_TOP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 9h18' }),
  svg.path({ d: 'M9 21V9' }),
];

export function renderLucidePanelsTopLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PANELS_TOP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-panels-top-left-icon',
  prototypeName: 'lucide-panels-top-left-icon',
  shapeFactory: LUCIDE_PANELS_TOP_LEFT_SHAPE_FACTORY,
});

export const asLucidePanelsTopLeftIcon = fixed.asHook;
export const lucidePanelsTopLeftIcon = fixed.prototype;
export default lucidePanelsTopLeftIcon;
