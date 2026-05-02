// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'key' as const;
export const LUCIDE_KEY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4' }),
  svg.path({ d: 'm21 2-9.6 9.6' }),
  svg.circle({ cx: 7.5, cy: 15.5, r: 5.5 }),
];

export function renderLucideKeyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_KEY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-key-icon',
  prototypeName: 'lucide-key-icon',
  shapeFactory: LUCIDE_KEY_SHAPE_FACTORY,
});

export const asLucideKeyIcon = fixed.asHook;
export const lucideKeyIcon = fixed.prototype;
export default lucideKeyIcon;
