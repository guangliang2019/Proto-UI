// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'squirrel' as const;
export const LUCIDE_SQUIRREL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15.236 22a3 3 0 0 0-2.2-5' }),
  svg.path({ d: 'M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4' }),
  svg.path({ d: 'M18 13h.01' }),
  svg.path({
    d: 'M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10',
  }),
];

export function renderLucideSquirrelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUIRREL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-squirrel-icon',
  prototypeName: 'lucide-squirrel-icon',
  shapeFactory: LUCIDE_SQUIRREL_SHAPE_FACTORY,
});

export const asLucideSquirrelIcon = fixed.asHook;
export const lucideSquirrelIcon = fixed.prototype;
export default lucideSquirrelIcon;
