// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-pen-line' as const;
export const LUCIDE_FILE_PEN_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z',
  }),
  svg.path({ d: 'M14.487 7.858A1 1 0 0 1 14 7V2' }),
  svg.path({
    d: 'M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516',
  }),
  svg.path({ d: 'M8 18h1' }),
];

export function renderLucideFilePenLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_PEN_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-pen-line-icon',
  prototypeName: 'lucide-file-pen-line-icon',
  shapeFactory: LUCIDE_FILE_PEN_LINE_SHAPE_FACTORY,
});

export const asLucideFilePenLineIcon = fixed.asHook;
export const lucideFilePenLineIcon = fixed.prototype;
export default lucideFilePenLineIcon;
