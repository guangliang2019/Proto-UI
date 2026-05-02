// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-input' as const;
export const LUCIDE_FOLDER_INPUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1',
  }),
  svg.path({ d: 'M2 13h10' }),
  svg.path({ d: 'm9 16 3-3-3-3' }),
];

export function renderLucideFolderInputIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_INPUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-input-icon',
  prototypeName: 'lucide-folder-input-icon',
  shapeFactory: LUCIDE_FOLDER_INPUT_SHAPE_FACTORY,
});

export const asLucideFolderInputIcon = fixed.asHook;
export const lucideFolderInputIcon = fixed.prototype;
export default lucideFolderInputIcon;
