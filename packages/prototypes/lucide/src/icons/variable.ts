// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'variable' as const;
export const LUCIDE_VARIABLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 21s-4-3-4-9 4-9 4-9' }),
  svg.path({ d: 'M16 3s4 3 4 9-4 9-4 9' }),
  svg.line({ x1: 15, x2: 9, y1: 9, y2: 15 }),
  svg.line({ x1: 9, x2: 15, y1: 9, y2: 15 }),
];

export function renderLucideVariableIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VARIABLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-variable-icon',
  prototypeName: 'lucide-variable-icon',
  shapeFactory: LUCIDE_VARIABLE_SHAPE_FACTORY,
});

export const asLucideVariableIcon = fixed.asHook;
export const lucideVariableIcon = fixed.prototype;
export default lucideVariableIcon;
