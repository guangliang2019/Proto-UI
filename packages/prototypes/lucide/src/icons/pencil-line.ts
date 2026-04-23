// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pencil-line' as const;
export const LUCIDE_PENCIL_LINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 21h8' }),
  svg.path({ d: 'm15 5 4 4' }),
  svg.path({
    d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
  }),
];

export function renderLucidePencilLineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PENCIL_LINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pencil-line-icon',
  prototypeName: 'lucide-pencil-line-icon',
  shapeFactory: LUCIDE_PENCIL_LINE_SHAPE_FACTORY,
});

export const asLucidePencilLineIcon = fixed.asHook;
export const lucidePencilLineIcon = fixed.prototype;
export default lucidePencilLineIcon;
