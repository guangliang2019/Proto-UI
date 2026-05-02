// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-braces-corner' as const;
export const LUCIDE_FILE_BRACES_CORNER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1' }),
  svg.path({ d: 'M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1' }),
];

export function renderLucideFileBracesCornerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_BRACES_CORNER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-braces-corner-icon',
  prototypeName: 'lucide-file-braces-corner-icon',
  shapeFactory: LUCIDE_FILE_BRACES_CORNER_SHAPE_FACTORY,
});

export const asLucideFileBracesCornerIcon = fixed.asHook;
export const lucideFileBracesCornerIcon = fixed.prototype;
export default lucideFileBracesCornerIcon;
