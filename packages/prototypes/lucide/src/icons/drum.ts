// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'drum' as const;
export const LUCIDE_DRUM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2 2 8 8' }),
  svg.path({ d: 'm22 2-8 8' }),
  svg.ellipse({ cx: 12, cy: 9, rx: 10, ry: 5 }),
  svg.path({ d: 'M7 13.4v7.9' }),
  svg.path({ d: 'M12 14v8' }),
  svg.path({ d: 'M17 13.4v7.9' }),
  svg.path({ d: 'M2 9v8a10 5 0 0 0 20 0V9' }),
];

export function renderLucideDrumIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DRUM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-drum-icon',
  prototypeName: 'lucide-drum-icon',
  shapeFactory: LUCIDE_DRUM_SHAPE_FACTORY,
});

export const asLucideDrumIcon = fixed.asHook;
export const lucideDrumIcon = fixed.prototype;
export default lucideDrumIcon;
