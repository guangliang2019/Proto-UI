// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-type-corner' as const;
export const LUCIDE_FILE_TYPE_CORNER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16' }),
  svg.path({ d: 'M6 22h2' }),
  svg.path({ d: 'M7 14v8' }),
];

export function renderLucideFileTypeCornerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_TYPE_CORNER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-type-corner-icon',
  prototypeName: 'lucide-file-type-corner-icon',
  shapeFactory: LUCIDE_FILE_TYPE_CORNER_SHAPE_FACTORY,
});

export const asLucideFileTypeCornerIcon = fixed.asHook;
export const lucideFileTypeCornerIcon = fixed.prototype;
export default lucideFileTypeCornerIcon;
