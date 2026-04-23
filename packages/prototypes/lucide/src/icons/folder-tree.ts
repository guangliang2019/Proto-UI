// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-tree' as const;
export const LUCIDE_FOLDER_TREE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z',
  }),
  svg.path({
    d: 'M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z',
  }),
  svg.path({ d: 'M3 5a2 2 0 0 0 2 2h3' }),
  svg.path({ d: 'M3 3v13a2 2 0 0 0 2 2h3' }),
];

export function renderLucideFolderTreeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_TREE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-tree-icon',
  prototypeName: 'lucide-folder-tree-icon',
  shapeFactory: LUCIDE_FOLDER_TREE_SHAPE_FACTORY,
});

export const asLucideFolderTreeIcon = fixed.asHook;
export const lucideFolderTreeIcon = fixed.prototype;
export default lucideFolderTreeIcon;
