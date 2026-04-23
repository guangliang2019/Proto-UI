// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-output' as const;
export const LUCIDE_FOLDER_OUTPUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5',
  }),
  svg.path({ d: 'M2 13h10' }),
  svg.path({ d: 'm5 10-3 3 3 3' }),
];

export function renderLucideFolderOutputIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_OUTPUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-output-icon',
  prototypeName: 'lucide-folder-output-icon',
  shapeFactory: LUCIDE_FOLDER_OUTPUT_SHAPE_FACTORY,
});

export const asLucideFolderOutputIcon = fixed.asHook;
export const lucideFolderOutputIcon = fixed.prototype;
export default lucideFolderOutputIcon;
