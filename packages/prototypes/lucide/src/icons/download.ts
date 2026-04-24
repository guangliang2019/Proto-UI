// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'download' as const;
export const LUCIDE_DOWNLOAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 15V3' }),
  svg.path({ d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  svg.path({ d: 'm7 10 5 5 5-5' }),
];

export function renderLucideDownloadIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOWNLOAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-download-icon',
  prototypeName: 'lucide-download-icon',
  shapeFactory: LUCIDE_DOWNLOAD_SHAPE_FACTORY,
});

export const asLucideDownloadIcon = fixed.asHook;
export const lucideDownloadIcon = fixed.prototype;
export default lucideDownloadIcon;
