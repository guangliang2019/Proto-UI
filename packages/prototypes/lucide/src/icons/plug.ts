// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'plug' as const;
export const LUCIDE_PLUG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22v-5' }),
  svg.path({ d: 'M15 8V2' }),
  svg.path({ d: 'M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z' }),
  svg.path({ d: 'M9 8V2' }),
];

export function renderLucidePlugIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PLUG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-plug-icon',
  prototypeName: 'lucide-plug-icon',
  shapeFactory: LUCIDE_PLUG_SHAPE_FACTORY,
});

export const asLucidePlugIcon = fixed.asHook;
export const lucidePlugIcon = fixed.prototype;
export default lucidePlugIcon;
