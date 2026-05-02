// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'milk' as const;
export const LUCIDE_MILK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2h8' }),
  svg.path({
    d: 'M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2',
  }),
  svg.path({ d: 'M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0' }),
];

export function renderLucideMilkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MILK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-milk-icon',
  prototypeName: 'lucide-milk-icon',
  shapeFactory: LUCIDE_MILK_SHAPE_FACTORY,
});

export const asLucideMilkIcon = fixed.asHook;
export const lucideMilkIcon = fixed.prototype;
export default lucideMilkIcon;
