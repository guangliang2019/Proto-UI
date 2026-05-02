// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'maximize' as const;
export const LUCIDE_MAXIMIZE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 3H5a2 2 0 0 0-2 2v3' }),
  svg.path({ d: 'M21 8V5a2 2 0 0 0-2-2h-3' }),
  svg.path({ d: 'M3 16v3a2 2 0 0 0 2 2h3' }),
  svg.path({ d: 'M16 21h3a2 2 0 0 0 2-2v-3' }),
];

export function renderLucideMaximizeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAXIMIZE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-maximize-icon',
  prototypeName: 'lucide-maximize-icon',
  shapeFactory: LUCIDE_MAXIMIZE_SHAPE_FACTORY,
});

export const asLucideMaximizeIcon = fixed.asHook;
export const lucideMaximizeIcon = fixed.prototype;
export default lucideMaximizeIcon;
