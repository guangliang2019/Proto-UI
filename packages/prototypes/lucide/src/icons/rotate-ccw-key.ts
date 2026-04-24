// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rotate-ccw-key' as const;
export const LUCIDE_ROTATE_CCW_KEY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7v6' }),
  svg.path({ d: 'M12 9h2' }),
  svg.path({ d: 'M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8' }),
  svg.path({ d: 'M3 3v5h5' }),
  svg.circle({ cx: 12, cy: 15, r: 2 }),
];

export function renderLucideRotateCcwKeyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROTATE_CCW_KEY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rotate-ccw-key-icon',
  prototypeName: 'lucide-rotate-ccw-key-icon',
  shapeFactory: LUCIDE_ROTATE_CCW_KEY_SHAPE_FACTORY,
});

export const asLucideRotateCcwKeyIcon = fixed.asHook;
export const lucideRotateCcwKeyIcon = fixed.prototype;
export default lucideRotateCcwKeyIcon;
