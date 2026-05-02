// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-backup' as const;
export const LUCIDE_CLOUD_BACKUP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607' }),
  svg.path({ d: 'M7 11v4h4' }),
  svg.path({ d: 'M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15' }),
];

export function renderLucideCloudBackupIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_BACKUP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-backup-icon',
  prototypeName: 'lucide-cloud-backup-icon',
  shapeFactory: LUCIDE_CLOUD_BACKUP_SHAPE_FACTORY,
});

export const asLucideCloudBackupIcon = fixed.asHook;
export const lucideCloudBackupIcon = fixed.prototype;
export default lucideCloudBackupIcon;
