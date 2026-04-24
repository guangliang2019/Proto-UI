// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'loader' as const;
export const LUCIDE_LOADER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v4' }),
  svg.path({ d: 'm16.2 7.8 2.9-2.9' }),
  svg.path({ d: 'M18 12h4' }),
  svg.path({ d: 'm16.2 16.2 2.9 2.9' }),
  svg.path({ d: 'M12 18v4' }),
  svg.path({ d: 'm4.9 19.1 2.9-2.9' }),
  svg.path({ d: 'M2 12h4' }),
  svg.path({ d: 'm4.9 4.9 2.9 2.9' }),
];

export function renderLucideLoaderIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOADER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-loader-icon',
  prototypeName: 'lucide-loader-icon',
  shapeFactory: LUCIDE_LOADER_SHAPE_FACTORY,
});

export const asLucideLoaderIcon = fixed.asHook;
export const lucideLoaderIcon = fixed.prototype;
export default lucideLoaderIcon;
