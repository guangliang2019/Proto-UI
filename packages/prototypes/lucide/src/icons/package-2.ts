// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'package-2' as const;
export const LUCIDE_PACKAGE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v6' }),
  svg.path({
    d: 'M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z',
  }),
  svg.path({ d: 'M3.054 9.013h17.893' }),
];

export function renderLucidePackage2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PACKAGE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-package-2-icon',
  prototypeName: 'lucide-package-2-icon',
  shapeFactory: LUCIDE_PACKAGE_2_SHAPE_FACTORY,
});

export const asLucidePackage2Icon = fixed.asHook;
export const lucidePackage2Icon = fixed.prototype;
export default lucidePackage2Icon;
