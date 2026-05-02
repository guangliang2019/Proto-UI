// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-plus' as const;
export const LUCIDE_FOLDER_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 10v6' }),
  svg.path({ d: 'M9 13h6' }),
  svg.path({
    d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
  }),
];

export function renderLucideFolderPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-plus-icon',
  prototypeName: 'lucide-folder-plus-icon',
  shapeFactory: LUCIDE_FOLDER_PLUS_SHAPE_FACTORY,
});

export const asLucideFolderPlusIcon = fixed.asHook;
export const lucideFolderPlusIcon = fixed.prototype;
export default lucideFolderPlusIcon;
