// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-chevrons-up-down' as const;
export const LUCIDE_LIST_CHEVRONS_UP_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5h8' }),
  svg.path({ d: 'M3 12h8' }),
  svg.path({ d: 'M3 19h8' }),
  svg.path({ d: 'm15 8 3-3 3 3' }),
  svg.path({ d: 'm15 16 3 3 3-3' }),
];

export function renderLucideListChevronsUpDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_CHEVRONS_UP_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-chevrons-up-down-icon',
  prototypeName: 'lucide-list-chevrons-up-down-icon',
  shapeFactory: LUCIDE_LIST_CHEVRONS_UP_DOWN_SHAPE_FACTORY,
});

export const asLucideListChevronsUpDownIcon = fixed.asHook;
export const lucideListChevronsUpDownIcon = fixed.prototype;
export default lucideListChevronsUpDownIcon;
