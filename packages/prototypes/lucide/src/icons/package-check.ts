// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'package-check' as const;
export const LUCIDE_PACKAGE_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22V12' }),
  svg.path({ d: 'm16 17 2 2 4-4' }),
  svg.path({
    d: 'M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753',
  }),
  svg.path({ d: 'M3.29 7 12 12l8.71-5' }),
  svg.path({ d: 'm7.5 4.27 8.997 5.148' }),
];

export function renderLucidePackageCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PACKAGE_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-package-check-icon',
  prototypeName: 'lucide-package-check-icon',
  shapeFactory: LUCIDE_PACKAGE_CHECK_SHAPE_FACTORY,
});

export const asLucidePackageCheckIcon = fixed.asHook;
export const lucidePackageCheckIcon = fixed.prototype;
export default lucidePackageCheckIcon;
