// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'presentation' as const;
export const LUCIDE_PRESENTATION_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 3h20' }),
  svg.path({ d: 'M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3' }),
  svg.path({ d: 'm7 21 5-5 5 5' }),
];

export function renderLucidePresentationIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PRESENTATION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-presentation-icon',
  prototypeName: 'lucide-presentation-icon',
  shapeFactory: LUCIDE_PRESENTATION_SHAPE_FACTORY,
});

export const asLucidePresentationIcon = fixed.asHook;
export const lucidePresentationIcon = fixed.prototype;
export default lucidePresentationIcon;
