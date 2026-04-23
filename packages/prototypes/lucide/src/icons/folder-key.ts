// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-key' as const;
export const LUCIDE_FOLDER_KEY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36',
  }),
  svg.path({ d: 'M19 12v6' }),
  svg.path({ d: 'M19 14h2' }),
  svg.circle({ cx: 19, cy: 20, r: 2 }),
];

export function renderLucideFolderKeyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_KEY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-key-icon',
  prototypeName: 'lucide-folder-key-icon',
  shapeFactory: LUCIDE_FOLDER_KEY_SHAPE_FACTORY,
});

export const asLucideFolderKeyIcon = fixed.asHook;
export const lucideFolderKeyIcon = fixed.prototype;
export default lucideFolderKeyIcon;
