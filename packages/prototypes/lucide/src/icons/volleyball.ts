// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'volleyball' as const;
export const LUCIDE_VOLLEYBALL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11.1 7.1a16.55 16.55 0 0 1 10.9 4' }),
  svg.path({ d: 'M12 12a12.6 12.6 0 0 1-8.7 5' }),
  svg.path({ d: 'M16.8 13.6a16.55 16.55 0 0 1-9 7.5' }),
  svg.path({ d: 'M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10' }),
  svg.path({ d: 'M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5' }),
  svg.circle({ cx: 12, cy: 12, r: 10 }),
];

export function renderLucideVolleyballIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VOLLEYBALL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-volleyball-icon',
  prototypeName: 'lucide-volleyball-icon',
  shapeFactory: LUCIDE_VOLLEYBALL_SHAPE_FACTORY,
});

export const asLucideVolleyballIcon = fixed.asHook;
export const lucideVolleyballIcon = fixed.prototype;
export default lucideVolleyballIcon;
