// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'copyright' as const;
export const LUCIDE_COPYRIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M14.83 14.83a4 4 0 1 1 0-5.66' }),
];

export function renderLucideCopyrightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COPYRIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-copyright-icon',
  prototypeName: 'lucide-copyright-icon',
  shapeFactory: LUCIDE_COPYRIGHT_SHAPE_FACTORY,
});

export const asLucideCopyrightIcon = fixed.asHook;
export const lucideCopyrightIcon = fixed.prototype;
export default lucideCopyrightIcon;
