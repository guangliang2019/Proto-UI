// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'feather' as const;
export const LUCIDE_FEATHER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z',
  }),
  svg.path({ d: 'M16 8 2 22' }),
  svg.path({ d: 'M17.5 15H9' }),
];

export function renderLucideFeatherIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FEATHER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-feather-icon',
  prototypeName: 'lucide-feather-icon',
  shapeFactory: LUCIDE_FEATHER_SHAPE_FACTORY,
});

export const asLucideFeatherIcon = fixed.asHook;
export const lucideFeatherIcon = fixed.prototype;
export default lucideFeatherIcon;
