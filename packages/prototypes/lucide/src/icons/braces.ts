// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'braces' as const;
export const LUCIDE_BRACES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1' }),
  svg.path({ d: 'M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' }),
];

export function renderLucideBracesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BRACES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-braces-icon',
  prototypeName: 'lucide-braces-icon',
  shapeFactory: LUCIDE_BRACES_SHAPE_FACTORY,
});

export const asLucideBracesIcon = fixed.asHook;
export const lucideBracesIcon = fixed.prototype;
export default lucideBracesIcon;
