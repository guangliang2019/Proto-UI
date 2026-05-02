// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'locate-off' as const;
export const LUCIDE_LOCATE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 19v3' }),
  svg.path({ d: 'M12 2v3' }),
  svg.path({ d: 'M18.89 13.24a7 7 0 0 0-8.13-8.13' }),
  svg.path({ d: 'M19 12h3' }),
  svg.path({ d: 'M2 12h3' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M7.05 7.05a7 7 0 0 0 9.9 9.9' }),
];

export function renderLucideLocateOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOCATE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-locate-off-icon',
  prototypeName: 'lucide-locate-off-icon',
  shapeFactory: LUCIDE_LOCATE_OFF_SHAPE_FACTORY,
});

export const asLucideLocateOffIcon = fixed.asHook;
export const lucideLocateOffIcon = fixed.prototype;
export default lucideLocateOffIcon;
