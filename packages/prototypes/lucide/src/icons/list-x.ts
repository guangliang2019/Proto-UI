// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-x' as const;
export const LUCIDE_LIST_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M11 12H3' }),
  svg.path({ d: 'M16 19H3' }),
  svg.path({ d: 'm15.5 9.5 5 5' }),
  svg.path({ d: 'm20.5 9.5-5 5' }),
];

export function renderLucideListXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-x-icon',
  prototypeName: 'lucide-list-x-icon',
  shapeFactory: LUCIDE_LIST_X_SHAPE_FACTORY,
});

export const asLucideListXIcon = fixed.asHook;
export const lucideListXIcon = fixed.prototype;
export default lucideListXIcon;
