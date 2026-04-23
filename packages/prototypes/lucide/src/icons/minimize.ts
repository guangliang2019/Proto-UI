// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'minimize' as const;
export const LUCIDE_MINIMIZE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 3v3a2 2 0 0 1-2 2H3' }),
  svg.path({ d: 'M21 8h-3a2 2 0 0 1-2-2V3' }),
  svg.path({ d: 'M3 16h3a2 2 0 0 1 2 2v3' }),
  svg.path({ d: 'M16 21v-3a2 2 0 0 1 2-2h3' }),
];

export function renderLucideMinimizeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MINIMIZE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-minimize-icon',
  prototypeName: 'lucide-minimize-icon',
  shapeFactory: LUCIDE_MINIMIZE_SHAPE_FACTORY,
});

export const asLucideMinimizeIcon = fixed.asHook;
export const lucideMinimizeIcon = fixed.prototype;
export default lucideMinimizeIcon;
