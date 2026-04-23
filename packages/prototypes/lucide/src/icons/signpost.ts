// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signpost' as const;
export const LUCIDE_SIGNPOST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13v8' }),
  svg.path({ d: 'M12 3v3' }),
  svg.path({
    d: 'M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z',
  }),
];

export function renderLucideSignpostIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNPOST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signpost-icon',
  prototypeName: 'lucide-signpost-icon',
  shapeFactory: LUCIDE_SIGNPOST_SHAPE_FACTORY,
});

export const asLucideSignpostIcon = fixed.asHook;
export const lucideSignpostIcon = fixed.prototype;
export default lucideSignpostIcon;
