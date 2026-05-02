// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-search' as const;
export const LUCIDE_FOLDER_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1',
  }),
  svg.path({ d: 'm21 21-1.9-1.9' }),
  svg.circle({ cx: 17, cy: 17, r: 3 }),
];

export function renderLucideFolderSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-search-icon',
  prototypeName: 'lucide-folder-search-icon',
  shapeFactory: LUCIDE_FOLDER_SEARCH_SHAPE_FACTORY,
});

export const asLucideFolderSearchIcon = fixed.asHook;
export const lucideFolderSearchIcon = fixed.prototype;
export default lucideFolderSearchIcon;
