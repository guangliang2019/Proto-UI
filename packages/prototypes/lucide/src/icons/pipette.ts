// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pipette' as const;
export const LUCIDE_PIPETTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12',
  }),
  svg.path({ d: 'm18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z' }),
  svg.path({ d: 'm2 22 .414-.414' }),
];

export function renderLucidePipetteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PIPETTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pipette-icon',
  prototypeName: 'lucide-pipette-icon',
  shapeFactory: LUCIDE_PIPETTE_SHAPE_FACTORY,
});

export const asLucidePipetteIcon = fixed.asHook;
export const lucidePipetteIcon = fixed.prototype;
export default lucidePipetteIcon;
