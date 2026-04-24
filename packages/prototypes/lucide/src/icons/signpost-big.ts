// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signpost-big' as const;
export const LUCIDE_SIGNPOST_BIG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 9H4L2 7l2-2h6' }),
  svg.path({ d: 'M14 5h6l2 2-2 2h-6' }),
  svg.path({ d: 'M10 22V4a2 2 0 1 1 4 0v18' }),
  svg.path({ d: 'M8 22h8' }),
];

export function renderLucideSignpostBigIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNPOST_BIG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signpost-big-icon',
  prototypeName: 'lucide-signpost-big-icon',
  shapeFactory: LUCIDE_SIGNPOST_BIG_SHAPE_FACTORY,
});

export const asLucideSignpostBigIcon = fixed.asHook;
export const lucideSignpostBigIcon = fixed.prototype;
export default lucideSignpostBigIcon;
