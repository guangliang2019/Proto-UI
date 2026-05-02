// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'headset' as const;
export const LUCIDE_HEADSET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z',
  }),
  svg.path({ d: 'M21 16v2a4 4 0 0 1-4 4h-5' }),
];

export function renderLucideHeadsetIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEADSET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-headset-icon',
  prototypeName: 'lucide-headset-icon',
  shapeFactory: LUCIDE_HEADSET_SHAPE_FACTORY,
});

export const asLucideHeadsetIcon = fixed.asHook;
export const lucideHeadsetIcon = fixed.prototype;
export default lucideHeadsetIcon;
