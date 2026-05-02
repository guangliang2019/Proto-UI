// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'database-backup' as const;
export const LUCIDE_DATABASE_BACKUP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.ellipse({ cx: 12, cy: 5, rx: 9, ry: 3 }),
  svg.path({ d: 'M3 12a9 3 0 0 0 5 2.69' }),
  svg.path({ d: 'M21 9.3V5' }),
  svg.path({ d: 'M3 5v14a9 3 0 0 0 6.47 2.88' }),
  svg.path({ d: 'M12 12v4h4' }),
  svg.path({ d: 'M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16' }),
];

export function renderLucideDatabaseBackupIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DATABASE_BACKUP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-database-backup-icon',
  prototypeName: 'lucide-database-backup-icon',
  shapeFactory: LUCIDE_DATABASE_BACKUP_SHAPE_FACTORY,
});

export const asLucideDatabaseBackupIcon = fixed.asHook;
export const lucideDatabaseBackupIcon = fixed.prototype;
export default lucideDatabaseBackupIcon;
