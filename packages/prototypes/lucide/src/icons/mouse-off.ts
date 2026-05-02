// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mouse-off' as const;
export const LUCIDE_MOUSE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v.343' }),
  svg.path({ d: 'M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218' }),
  svg.path({ d: 'M19 13.343V9A7 7 0 0 0 8.56 2.902' }),
  svg.path({ d: 'M22 22 2 2' }),
];

export function renderLucideMouseOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOUSE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mouse-off-icon',
  prototypeName: 'lucide-mouse-off-icon',
  shapeFactory: LUCIDE_MOUSE_OFF_SHAPE_FACTORY,
});

export const asLucideMouseOffIcon = fixed.asHook;
export const lucideMouseOffIcon = fixed.prototype;
export default lucideMouseOffIcon;
