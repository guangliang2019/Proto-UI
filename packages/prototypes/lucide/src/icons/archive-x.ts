// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'archive-x' as const;
export const LUCIDE_ARCHIVE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 5, x: 2, y: 3, rx: 1 }),
  svg.path({ d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8' }),
  svg.path({ d: 'm9.5 17 5-5' }),
  svg.path({ d: 'm9.5 12 5 5' }),
];

export function renderLucideArchiveXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARCHIVE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-archive-x-icon',
  prototypeName: 'lucide-archive-x-icon',
  shapeFactory: LUCIDE_ARCHIVE_X_SHAPE_FACTORY,
});

export const asLucideArchiveXIcon = fixed.asHook;
export const lucideArchiveXIcon = fixed.prototype;
export default lucideArchiveXIcon;
