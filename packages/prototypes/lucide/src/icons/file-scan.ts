// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-scan' as const;
export const LUCIDE_FILE_SCAN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M16 14a2 2 0 0 0-2 2' }),
  svg.path({ d: 'M16 22a2 2 0 0 1-2-2' }),
  svg.path({ d: 'M20 14a2 2 0 0 1 2 2' }),
  svg.path({ d: 'M20 22a2 2 0 0 0 2-2' }),
];

export function renderLucideFileScanIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_SCAN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-scan-icon',
  prototypeName: 'lucide-file-scan-icon',
  shapeFactory: LUCIDE_FILE_SCAN_SHAPE_FACTORY,
});

export const asLucideFileScanIcon = fixed.asHook;
export const lucideFileScanIcon = fixed.prototype;
export default lucideFileScanIcon;
