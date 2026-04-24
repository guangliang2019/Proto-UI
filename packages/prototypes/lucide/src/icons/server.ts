// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'server' as const;
export const LUCIDE_SERVER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 8, x: 2, y: 2, rx: 2, ry: 2 }),
  svg.rect({ width: 20, height: 8, x: 2, y: 14, rx: 2, ry: 2 }),
  svg.line({ x1: 6, x2: 6.01, y1: 6, y2: 6 }),
  svg.line({ x1: 6, x2: 6.01, y1: 18, y2: 18 }),
];

export function renderLucideServerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SERVER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-server-icon',
  prototypeName: 'lucide-server-icon',
  shapeFactory: LUCIDE_SERVER_SHAPE_FACTORY,
});

export const asLucideServerIcon = fixed.asHook;
export const lucideServerIcon = fixed.prototype;
export default lucideServerIcon;
