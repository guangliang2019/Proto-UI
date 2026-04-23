// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scan-eye' as const;
export const LUCIDE_SCAN_EYE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 7V5a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M17 3h2a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M21 17v2a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M7 21H5a2 2 0 0 1-2-2v-2' }),
  svg.circle({ cx: 12, cy: 12, r: 1 }),
  svg.path({
    d: 'M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0',
  }),
];

export function renderLucideScanEyeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCAN_EYE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scan-eye-icon',
  prototypeName: 'lucide-scan-eye-icon',
  shapeFactory: LUCIDE_SCAN_EYE_SHAPE_FACTORY,
});

export const asLucideScanEyeIcon = fixed.asHook;
export const lucideScanEyeIcon = fixed.prototype;
export default lucideScanEyeIcon;
