// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hand-grab' as const;
export const LUCIDE_HAND_GRAB_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4' }),
  svg.path({ d: 'M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2' }),
  svg.path({ d: 'M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5' }),
  svg.path({ d: 'M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2' }),
  svg.path({ d: 'M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0' }),
];

export function renderLucideHandGrabIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAND_GRAB_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hand-grab-icon',
  prototypeName: 'lucide-hand-grab-icon',
  shapeFactory: LUCIDE_HAND_GRAB_SHAPE_FACTORY,
});

export const asLucideHandGrabIcon = fixed.asHook;
export const lucideHandGrabIcon = fixed.prototype;
export default lucideHandGrabIcon;
