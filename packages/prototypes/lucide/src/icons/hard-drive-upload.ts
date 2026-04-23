// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hard-drive-upload' as const;
export const LUCIDE_HARD_DRIVE_UPLOAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 6-4-4-4 4' }),
  svg.path({ d: 'M12 2v8' }),
  svg.rect({ width: 20, height: 8, x: 2, y: 14, rx: 2 }),
  svg.path({ d: 'M6 18h.01' }),
  svg.path({ d: 'M10 18h.01' }),
];

export function renderLucideHardDriveUploadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HARD_DRIVE_UPLOAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hard-drive-upload-icon',
  prototypeName: 'lucide-hard-drive-upload-icon',
  shapeFactory: LUCIDE_HARD_DRIVE_UPLOAD_SHAPE_FACTORY,
});

export const asLucideHardDriveUploadIcon = fixed.asHook;
export const lucideHardDriveUploadIcon = fixed.prototype;
export default lucideHardDriveUploadIcon;
