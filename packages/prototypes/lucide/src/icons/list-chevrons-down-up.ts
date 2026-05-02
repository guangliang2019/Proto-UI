// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-chevrons-down-up' as const;
export const LUCIDE_LIST_CHEVRONS_DOWN_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5h8' }),
  svg.path({ d: 'M3 12h8' }),
  svg.path({ d: 'M3 19h8' }),
  svg.path({ d: 'm15 5 3 3 3-3' }),
  svg.path({ d: 'm15 19 3-3 3 3' }),
];

export function renderLucideListChevronsDownUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_CHEVRONS_DOWN_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-chevrons-down-up-icon',
  prototypeName: 'lucide-list-chevrons-down-up-icon',
  shapeFactory: LUCIDE_LIST_CHEVRONS_DOWN_UP_SHAPE_FACTORY,
});

export const asLucideListChevronsDownUpIcon = fixed.asHook;
export const lucideListChevronsDownUpIcon = fixed.prototype;
export default lucideListChevronsDownUpIcon;
