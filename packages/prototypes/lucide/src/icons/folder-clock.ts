// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'folder-clock' as const;
export const LUCIDE_FOLDER_CLOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 14v2.2l1.6 1' }),
  svg.path({
    d: 'M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2',
  }),
  svg.circle({ cx: 16, cy: 16, r: 6 }),
];

export function renderLucideFolderClockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FOLDER_CLOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-folder-clock-icon',
  prototypeName: 'lucide-folder-clock-icon',
  shapeFactory: LUCIDE_FOLDER_CLOCK_SHAPE_FACTORY,
});

export const asLucideFolderClockIcon = fixed.asHook;
export const lucideFolderClockIcon = fixed.prototype;
export default lucideFolderClockIcon;
