// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lectern' as const;
export const LUCIDE_LECTERN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3',
  }),
  svg.path({ d: 'M18 6V3a1 1 0 0 0-1-1h-3' }),
  svg.rect({ width: 8, height: 12, x: 8, y: 10, rx: 1 }),
];

export function renderLucideLecternIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LECTERN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lectern-icon',
  prototypeName: 'lucide-lectern-icon',
  shapeFactory: LUCIDE_LECTERN_SHAPE_FACTORY,
});

export const asLucideLecternIcon = fixed.asHook;
export const lucideLecternIcon = fixed.prototype;
export default lucideLecternIcon;
