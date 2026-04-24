// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'maximize-2' as const;
export const LUCIDE_MAXIMIZE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 3h6v6' }),
  svg.path({ d: 'm21 3-7 7' }),
  svg.path({ d: 'm3 21 7-7' }),
  svg.path({ d: 'M9 21H3v-6' }),
];

export function renderLucideMaximize2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAXIMIZE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-maximize-2-icon',
  prototypeName: 'lucide-maximize-2-icon',
  shapeFactory: LUCIDE_MAXIMIZE_2_SHAPE_FACTORY,
});

export const asLucideMaximize2Icon = fixed.asHook;
export const lucideMaximize2Icon = fixed.prototype;
export default lucideMaximize2Icon;
