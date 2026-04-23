// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-down' as const;
export const LUCIDE_ARROW_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 5v14' }),
  svg.path({ d: 'm19 12-7 7-7-7' }),
];

export function renderLucideArrowDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-down-icon',
  prototypeName: 'lucide-arrow-down-icon',
  shapeFactory: LUCIDE_ARROW_DOWN_SHAPE_FACTORY,
});

export const asLucideArrowDownIcon = fixed.asHook;
export const lucideArrowDownIcon = fixed.prototype;
export default lucideArrowDownIcon;
