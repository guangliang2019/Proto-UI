// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'diff' as const;
export const LUCIDE_DIFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v14' }),
  svg.path({ d: 'M5 10h14' }),
  svg.path({ d: 'M5 21h14' }),
];

export function renderLucideDiffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DIFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-diff-icon',
  prototypeName: 'lucide-diff-icon',
  shapeFactory: LUCIDE_DIFF_SHAPE_FACTORY,
});

export const asLucideDiffIcon = fixed.asHook;
export const lucideDiffIcon = fixed.prototype;
export default lucideDiffIcon;
