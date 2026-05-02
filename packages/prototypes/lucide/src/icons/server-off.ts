// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'server-off' as const;
export const LUCIDE_SERVER_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5' }),
  svg.path({ d: 'M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z' }),
  svg.path({ d: 'M22 17v-1a2 2 0 0 0-2-2h-1' }),
  svg.path({ d: 'M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z' }),
  svg.path({ d: 'M6 18h.01' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideServerOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SERVER_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-server-off-icon',
  prototypeName: 'lucide-server-off-icon',
  shapeFactory: LUCIDE_SERVER_OFF_SHAPE_FACTORY,
});

export const asLucideServerOffIcon = fixed.asHook;
export const lucideServerOffIcon = fixed.prototype;
export default lucideServerOffIcon;
