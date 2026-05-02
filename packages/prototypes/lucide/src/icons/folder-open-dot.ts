// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-open-dot' as const;
export const LUCIDE_FOLDER_OPEN_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2',
  }),
  svg.circle({ cx: 14, cy: 15, r: 1 }),
];

export function renderLucideFolderOpenDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_OPEN_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-open-dot-icon',
  prototypeName: 'lucide-folder-open-dot-icon',
  shapeFactory: LUCIDE_FOLDER_OPEN_DOT_SHAPE_FACTORY,
});

export const asLucideFolderOpenDotIcon = fixed.asHook;
export const lucideFolderOpenDotIcon = fixed.prototype;
export default lucideFolderOpenDotIcon;
