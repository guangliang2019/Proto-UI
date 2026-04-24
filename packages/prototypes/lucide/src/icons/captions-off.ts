// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'captions-off' as const;
export const LUCIDE_CAPTIONS_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.5 5H19a2 2 0 0 1 2 2v8.5' }),
  svg.path({ d: 'M17 11h-.5' }),
  svg.path({ d: 'M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M7 11h4' }),
  svg.path({ d: 'M7 15h2.5' }),
];

export function renderLucideCaptionsOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAPTIONS_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-captions-off-icon',
  prototypeName: 'lucide-captions-off-icon',
  shapeFactory: LUCIDE_CAPTIONS_OFF_SHAPE_FACTORY,
});

export const asLucideCaptionsOffIcon = fixed.asHook;
export const lucideCaptionsOffIcon = fixed.prototype;
export default lucideCaptionsOffIcon;
