// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'spool' as const;
export const LUCIDE_SPOOL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66',
  }),
  svg.path({
    d: 'm7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178',
  }),
];

export function renderLucideSpoolIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPOOL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-spool-icon',
  prototypeName: 'lucide-spool-icon',
  shapeFactory: LUCIDE_SPOOL_SHAPE_FACTORY,
});

export const asLucideSpoolIcon = fixed.asHook;
export const lucideSpoolIcon = fixed.prototype;
export default lucideSpoolIcon;
