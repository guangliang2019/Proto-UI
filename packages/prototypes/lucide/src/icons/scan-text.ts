// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scan-text' as const;
export const LUCIDE_SCAN_TEXT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 7V5a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M17 3h2a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M21 17v2a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M7 21H5a2 2 0 0 1-2-2v-2' }),
  svg.path({ d: 'M7 8h8' }),
  svg.path({ d: 'M7 12h10' }),
  svg.path({ d: 'M7 16h6' }),
];

export function renderLucideScanTextIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCAN_TEXT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scan-text-icon',
  prototypeName: 'lucide-scan-text-icon',
  shapeFactory: LUCIDE_SCAN_TEXT_SHAPE_FACTORY,
});

export const asLucideScanTextIcon = fixed.asHook;
export const lucideScanTextIcon = fixed.prototype;
export default lucideScanTextIcon;
