// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-x' as const;
export const LUCIDE_FILE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'm14.5 12.5-5 5' }),
  svg.path({ d: 'm9.5 12.5 5 5' }),
];

export function renderLucideFileXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-x-icon',
  prototypeName: 'lucide-file-x-icon',
  shapeFactory: LUCIDE_FILE_X_SHAPE_FACTORY,
});

export const asLucideFileXIcon = fixed.asHook;
export const lucideFileXIcon = fixed.prototype;
export default lucideFileXIcon;
