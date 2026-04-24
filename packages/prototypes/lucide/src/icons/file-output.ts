// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-output' as const;
export const LUCIDE_FILE_OUTPUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'm5 11-3 3' }),
  svg.path({ d: 'm5 17-3-3h10' }),
];

export function renderLucideFileOutputIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_OUTPUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-output-icon',
  prototypeName: 'lucide-file-output-icon',
  shapeFactory: LUCIDE_FILE_OUTPUT_SHAPE_FACTORY,
});

export const asLucideFileOutputIcon = fixed.asHook;
export const lucideFileOutputIcon = fixed.prototype;
export default lucideFileOutputIcon;
