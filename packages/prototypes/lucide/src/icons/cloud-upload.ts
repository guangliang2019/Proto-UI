// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-upload' as const;
export const LUCIDE_CLOUD_UPLOAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13v8' }),
  svg.path({ d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
  svg.path({ d: 'm8 17 4-4 4 4' }),
];

export function renderLucideCloudUploadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_UPLOAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-upload-icon',
  prototypeName: 'lucide-cloud-upload-icon',
  shapeFactory: LUCIDE_CLOUD_UPLOAD_SHAPE_FACTORY,
});

export const asLucideCloudUploadIcon = fixed.asHook;
export const lucideCloudUploadIcon = fixed.prototype;
export default lucideCloudUploadIcon;
