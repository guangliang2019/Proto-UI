// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'merge' as const;
export const LUCIDE_MERGE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm8 6 4-4 4 4' }),
  svg.path({ d: 'M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22' }),
  svg.path({ d: 'm20 22-5-5' }),
];

export function renderLucideMergeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MERGE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-merge-icon',
  prototypeName: 'lucide-merge-icon',
  shapeFactory: LUCIDE_MERGE_SHAPE_FACTORY,
});

export const asLucideMergeIcon = fixed.asHook;
export const lucideMergeIcon = fixed.prototype;
export default lucideMergeIcon;
