// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dock' as const;
export const LUCIDE_DOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 8h20' }),
  svg.rect({ width: 20, height: 16, x: 2, y: 4, rx: 2 }),
  svg.path({ d: 'M6 16h12' }),
];

export function renderLucideDockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dock-icon',
  prototypeName: 'lucide-dock-icon',
  shapeFactory: LUCIDE_DOCK_SHAPE_FACTORY,
});

export const asLucideDockIcon = fixed.asHook;
export const lucideDockIcon = fixed.prototype;
export default lucideDockIcon;
