// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-check-corner' as const;
export const LUCIDE_FILE_CHECK_CORNER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'm14 20 2 2 4-4' }),
];

export function renderLucideFileCheckCornerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_CHECK_CORNER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-check-corner-icon',
  prototypeName: 'lucide-file-check-corner-icon',
  shapeFactory: LUCIDE_FILE_CHECK_CORNER_SHAPE_FACTORY,
});

export const asLucideFileCheckCornerIcon = fixed.asHook;
export const lucideFileCheckCornerIcon = fixed.prototype;
export default lucideFileCheckCornerIcon;
