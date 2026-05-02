// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'house-plug' as const;
export const LUCIDE_HOUSE_PLUG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 12V8.964' }),
  svg.path({ d: 'M14 12V8.964' }),
  svg.path({ d: 'M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z' }),
  svg.path({
    d: 'M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2',
  }),
];

export function renderLucideHousePlugIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOUSE_PLUG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-house-plug-icon',
  prototypeName: 'lucide-house-plug-icon',
  shapeFactory: LUCIDE_HOUSE_PLUG_SHAPE_FACTORY,
});

export const asLucideHousePlugIcon = fixed.asHook;
export const lucideHousePlugIcon = fixed.prototype;
export default lucideHousePlugIcon;
