// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cherry' as const;
export const LUCIDE_CHERRY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z' }),
  svg.path({ d: 'M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z' }),
  svg.path({ d: 'M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12' }),
  svg.path({ d: 'M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z' }),
];

export function renderLucideCherryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHERRY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cherry-icon',
  prototypeName: 'lucide-cherry-icon',
  shapeFactory: LUCIDE_CHERRY_SHAPE_FACTORY,
});

export const asLucideCherryIcon = fixed.asHook;
export const lucideCherryIcon = fixed.prototype;
export default lucideCherryIcon;
