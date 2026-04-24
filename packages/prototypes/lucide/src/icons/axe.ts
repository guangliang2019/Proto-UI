// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'axe' as const;
export const LUCIDE_AXE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9' }),
  svg.path({
    d: 'M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z',
  }),
];

export function renderLucideAxeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AXE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-axe-icon',
  prototypeName: 'lucide-axe-icon',
  shapeFactory: LUCIDE_AXE_SHAPE_FACTORY,
});

export const asLucideAxeIcon = fixed.asHook;
export const lucideAxeIcon = fixed.prototype;
export default lucideAxeIcon;
