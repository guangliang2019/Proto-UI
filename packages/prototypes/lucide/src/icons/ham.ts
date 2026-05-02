// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ham' as const;
export const LUCIDE_HAM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856' }),
  svg.path({
    d: 'M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288',
  }),
  svg.path({
    d: 'M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025',
  }),
  svg.path({ d: 'm8.5 16.5-1-1' }),
];

export function renderLucideHamIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ham-icon',
  prototypeName: 'lucide-ham-icon',
  shapeFactory: LUCIDE_HAM_SHAPE_FACTORY,
});

export const asLucideHamIcon = fixed.asHook;
export const lucideHamIcon = fixed.prototype;
export default lucideHamIcon;
