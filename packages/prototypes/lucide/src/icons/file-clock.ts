// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-clock' as const;
export const LUCIDE_FILE_CLOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M8 14v2.2l1.6 1' }),
  svg.circle({ cx: 8, cy: 16, r: 6 }),
];

export function renderLucideFileClockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_CLOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-clock-icon',
  prototypeName: 'lucide-file-clock-icon',
  shapeFactory: LUCIDE_FILE_CLOCK_SHAPE_FACTORY,
});

export const asLucideFileClockIcon = fixed.asHook;
export const lucideFileClockIcon = fixed.prototype;
export default lucideFileClockIcon;
