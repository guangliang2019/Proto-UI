// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'archive-restore' as const;
export const LUCIDE_ARCHIVE_RESTORE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 5, x: 2, y: 3, rx: 1 }),
  svg.path({ d: 'M4 8v11a2 2 0 0 0 2 2h2' }),
  svg.path({ d: 'M20 8v11a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'm9 15 3-3 3 3' }),
  svg.path({ d: 'M12 12v9' }),
];

export function renderLucideArchiveRestoreIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARCHIVE_RESTORE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-archive-restore-icon',
  prototypeName: 'lucide-archive-restore-icon',
  shapeFactory: LUCIDE_ARCHIVE_RESTORE_SHAPE_FACTORY,
});

export const asLucideArchiveRestoreIcon = fixed.asHook;
export const lucideArchiveRestoreIcon = fixed.prototype;
export default lucideArchiveRestoreIcon;
