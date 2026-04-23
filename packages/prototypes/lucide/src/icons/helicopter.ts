// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'helicopter' as const;
export const LUCIDE_HELICOPTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 17v4' }),
  svg.path({ d: 'M14 3v8a2 2 0 0 0 2 2h5.865' }),
  svg.path({ d: 'M17 17v4' }),
  svg.path({ d: 'M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z' }),
  svg.path({ d: 'M2 10v5' }),
  svg.path({ d: 'M6 3h16' }),
  svg.path({ d: 'M7 21h14' }),
  svg.path({ d: 'M8 13H2' }),
];

export function renderLucideHelicopterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HELICOPTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-helicopter-icon',
  prototypeName: 'lucide-helicopter-icon',
  shapeFactory: LUCIDE_HELICOPTER_SHAPE_FACTORY,
});

export const asLucideHelicopterIcon = fixed.asHook;
export const lucideHelicopterIcon = fixed.prototype;
export default lucideHelicopterIcon;
