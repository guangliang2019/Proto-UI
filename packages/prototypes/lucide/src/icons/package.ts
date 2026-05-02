// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'package' as const;
export const LUCIDE_PACKAGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z',
  }),
  svg.path({ d: 'M12 22V12' }),
  svg.polyline({ points: '3.29 7 12 12 20.71 7' }),
  svg.path({ d: 'm7.5 4.27 9 5.15' }),
];

export function renderLucidePackageIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PACKAGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-package-icon',
  prototypeName: 'lucide-package-icon',
  shapeFactory: LUCIDE_PACKAGE_SHAPE_FACTORY,
});

export const asLucidePackageIcon = fixed.asHook;
export const lucidePackageIcon = fixed.prototype;
export default lucidePackageIcon;
