// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-open' as const;
export const LUCIDE_FOLDER_OPEN_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
  });

export function renderLucideFolderOpenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_OPEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-open-icon',
  prototypeName: 'lucide-folder-open-icon',
  shapeFactory: LUCIDE_FOLDER_OPEN_SHAPE_FACTORY,
});

export const asLucideFolderOpenIcon = fixed.asHook;
export const lucideFolderOpenIcon = fixed.prototype;
export default lucideFolderOpenIcon;
