// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-archive' as const;
export const LUCIDE_FOLDER_ARCHIVE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 15, cy: 19, r: 2 }),
  svg.path({
    d: 'M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1',
  }),
  svg.path({ d: 'M15 11v-1' }),
  svg.path({ d: 'M15 17v-2' }),
];

export function renderLucideFolderArchiveIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_ARCHIVE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-archive-icon',
  prototypeName: 'lucide-folder-archive-icon',
  shapeFactory: LUCIDE_FOLDER_ARCHIVE_SHAPE_FACTORY,
});

export const asLucideFolderArchiveIcon = fixed.asHook;
export const lucideFolderArchiveIcon = fixed.prototype;
export default lucideFolderArchiveIcon;
