// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-search-2' as const;
export const LUCIDE_FOLDER_SEARCH_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11.5, cy: 12.5, r: 2.5 }),
  svg.path({
    d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
  }),
  svg.path({ d: 'M13.3 14.3 15 16' }),
];

export function renderLucideFolderSearch2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_SEARCH_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-search-2-icon',
  prototypeName: 'lucide-folder-search-2-icon',
  shapeFactory: LUCIDE_FOLDER_SEARCH_2_SHAPE_FACTORY,
});

export const asLucideFolderSearch2Icon = fixed.asHook;
export const lucideFolderSearch2Icon = fixed.prototype;
export default lucideFolderSearch2Icon;
