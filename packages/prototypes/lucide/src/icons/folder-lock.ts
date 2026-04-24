// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-lock' as const;
export const LUCIDE_FOLDER_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 8, height: 5, x: 14, y: 17, rx: 1 }),
  svg.path({
    d: 'M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5',
  }),
  svg.path({ d: 'M20 17v-2a2 2 0 1 0-4 0v2' }),
];

export function renderLucideFolderLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-lock-icon',
  prototypeName: 'lucide-folder-lock-icon',
  shapeFactory: LUCIDE_FOLDER_LOCK_SHAPE_FACTORY,
});

export const asLucideFolderLockIcon = fixed.asHook;
export const lucideFolderLockIcon = fixed.prototype;
export default lucideFolderLockIcon;
