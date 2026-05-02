// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'package-plus' as const;
export const LUCIDE_PACKAGE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22V12' }),
  svg.path({ d: 'M16 17h6' }),
  svg.path({ d: 'M19 14v6' }),
  svg.path({
    d: 'M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955',
  }),
  svg.path({ d: 'M3.29 7 12 12l8.71-5' }),
  svg.path({ d: 'm7.5 4.27 8.997 5.148' }),
];

export function renderLucidePackagePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PACKAGE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-package-plus-icon',
  prototypeName: 'lucide-package-plus-icon',
  shapeFactory: LUCIDE_PACKAGE_PLUS_SHAPE_FACTORY,
});

export const asLucidePackagePlusIcon = fixed.asHook;
export const lucidePackagePlusIcon = fixed.prototype;
export default lucidePackagePlusIcon;
