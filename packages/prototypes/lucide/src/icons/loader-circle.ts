// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'loader-circle' as const;
export const LUCIDE_LOADER_CIRCLE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M21 12a9 9 0 1 1-6.219-8.56' });

export function renderLucideLoaderCircleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOADER_CIRCLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-loader-circle-icon',
  prototypeName: 'lucide-loader-circle-icon',
  shapeFactory: LUCIDE_LOADER_CIRCLE_SHAPE_FACTORY,
});

export const asLucideLoaderCircleIcon = fixed.asHook;
export const lucideLoaderCircleIcon = fixed.prototype;
export default lucideLoaderCircleIcon;
