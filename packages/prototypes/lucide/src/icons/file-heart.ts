// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-heart' as const;
export const LUCIDE_FILE_HEART_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({
    d: 'M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z',
  }),
];

export function renderLucideFileHeartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_HEART_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-heart-icon',
  prototypeName: 'lucide-file-heart-icon',
  shapeFactory: LUCIDE_FILE_HEART_SHAPE_FACTORY,
});

export const asLucideFileHeartIcon = fixed.asHook;
export const lucideFileHeartIcon = fixed.prototype;
export default lucideFileHeartIcon;
