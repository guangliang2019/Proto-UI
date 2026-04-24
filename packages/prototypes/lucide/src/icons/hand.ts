// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hand' as const;
export const LUCIDE_HAND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2' }),
  svg.path({ d: 'M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2' }),
  svg.path({ d: 'M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8' }),
  svg.path({
    d: 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
  }),
];

export function renderLucideHandIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hand-icon',
  prototypeName: 'lucide-hand-icon',
  shapeFactory: LUCIDE_HAND_SHAPE_FACTORY,
});

export const asLucideHandIcon = fixed.asHook;
export const lucideHandIcon = fixed.prototype;
export default lucideHandIcon;
