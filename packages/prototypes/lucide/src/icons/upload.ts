// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'upload' as const;
export const LUCIDE_UPLOAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v12' }),
  svg.path({ d: 'm17 8-5-5-5 5' }),
  svg.path({ d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
];

export function renderLucideUploadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UPLOAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-upload-icon',
  prototypeName: 'lucide-upload-icon',
  shapeFactory: LUCIDE_UPLOAD_SHAPE_FACTORY,
});

export const asLucideUploadIcon = fixed.asHook;
export const lucideUploadIcon = fixed.prototype;
export default lucideUploadIcon;
