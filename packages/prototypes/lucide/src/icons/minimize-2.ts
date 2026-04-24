// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'minimize-2' as const;
export const LUCIDE_MINIMIZE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 10 7-7' }),
  svg.path({ d: 'M20 10h-6V4' }),
  svg.path({ d: 'm3 21 7-7' }),
  svg.path({ d: 'M4 14h6v6' }),
];

export function renderLucideMinimize2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MINIMIZE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-minimize-2-icon',
  prototypeName: 'lucide-minimize-2-icon',
  shapeFactory: LUCIDE_MINIMIZE_2_SHAPE_FACTORY,
});

export const asLucideMinimize2Icon = fixed.asHook;
export const lucideMinimize2Icon = fixed.prototype;
export default lucideMinimize2Icon;
