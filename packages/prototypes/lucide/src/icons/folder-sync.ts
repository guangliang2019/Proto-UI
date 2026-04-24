// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-sync' as const;
export const LUCIDE_FOLDER_SYNC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5',
  }),
  svg.path({ d: 'M12 10v4h4' }),
  svg.path({ d: 'm12 14 1.535-1.605a5 5 0 0 1 8 1.5' }),
  svg.path({ d: 'M22 22v-4h-4' }),
  svg.path({ d: 'm22 18-1.535 1.605a5 5 0 0 1-8-1.5' }),
];

export function renderLucideFolderSyncIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_SYNC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-sync-icon',
  prototypeName: 'lucide-folder-sync-icon',
  shapeFactory: LUCIDE_FOLDER_SYNC_SHAPE_FACTORY,
});

export const asLucideFolderSyncIcon = fixed.asHook;
export const lucideFolderSyncIcon = fixed.prototype;
export default lucideFolderSyncIcon;
