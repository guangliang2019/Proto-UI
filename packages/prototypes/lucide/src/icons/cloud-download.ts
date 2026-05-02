// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-download' as const;
export const LUCIDE_CLOUD_DOWNLOAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13v8l-4-4' }),
  svg.path({ d: 'm12 21 4-4' }),
  svg.path({ d: 'M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284' }),
];

export function renderLucideCloudDownloadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_DOWNLOAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-download-icon',
  prototypeName: 'lucide-cloud-download-icon',
  shapeFactory: LUCIDE_CLOUD_DOWNLOAD_SHAPE_FACTORY,
});

export const asLucideCloudDownloadIcon = fixed.asHook;
export const lucideCloudDownloadIcon = fixed.prototype;
export default lucideCloudDownloadIcon;
