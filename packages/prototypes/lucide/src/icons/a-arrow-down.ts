// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'a-arrow-down' as const;
export const LUCIDE_A_ARROW_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 12 4 4 4-4' }),
  svg.path({ d: 'M18 16V7' }),
  svg.path({ d: 'm2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16' }),
  svg.path({ d: 'M3.304 13h6.392' }),
];

export function renderLucideAArrowDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_A_ARROW_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-a-arrow-down-icon',
  prototypeName: 'lucide-a-arrow-down-icon',
  shapeFactory: LUCIDE_A_ARROW_DOWN_SHAPE_FACTORY,
});

export const asLucideAArrowDownIcon = fixed.asHook;
export const lucideAArrowDownIcon = fixed.prototype;
export default lucideAArrowDownIcon;
