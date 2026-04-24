// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-search' as const;
export const LUCIDE_FILE_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.circle({ cx: 11.5, cy: 14.5, r: 2.5 }),
  svg.path({ d: 'M13.3 16.3 15 18' }),
];

export function renderLucideFileSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-search-icon',
  prototypeName: 'lucide-file-search-icon',
  shapeFactory: LUCIDE_FILE_SEARCH_SHAPE_FACTORY,
});

export const asLucideFileSearchIcon = fixed.asHook;
export const lucideFileSearchIcon = fixed.prototype;
export default lucideFileSearchIcon;
