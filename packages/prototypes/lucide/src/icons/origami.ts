// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'origami' as const;
export const LUCIDE_ORIGAMI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025' }),
  svg.path({
    d: 'm12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009',
  }),
  svg.path({
    d: 'm12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027',
  }),
];

export function renderLucideOrigamiIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ORIGAMI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-origami-icon',
  prototypeName: 'lucide-origami-icon',
  shapeFactory: LUCIDE_ORIGAMI_SHAPE_FACTORY,
});

export const asLucideOrigamiIcon = fixed.asHook;
export const lucideOrigamiIcon = fixed.prototype;
export default lucideOrigamiIcon;
