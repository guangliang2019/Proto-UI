// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'thumbs-down' as const;
export const LUCIDE_THUMBS_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z',
  }),
  svg.path({ d: 'M17 14V2' }),
];

export function renderLucideThumbsDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_THUMBS_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-thumbs-down-icon',
  prototypeName: 'lucide-thumbs-down-icon',
  shapeFactory: LUCIDE_THUMBS_DOWN_SHAPE_FACTORY,
});

export const asLucideThumbsDownIcon = fixed.asHook;
export const lucideThumbsDownIcon = fixed.prototype;
export default lucideThumbsDownIcon;
