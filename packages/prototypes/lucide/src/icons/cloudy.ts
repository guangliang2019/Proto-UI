// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloudy' as const;
export const LUCIDE_CLOUDY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z' }),
  svg.path({ d: 'M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61' }),
];

export function renderLucideCloudyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUDY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloudy-icon',
  prototypeName: 'lucide-cloudy-icon',
  shapeFactory: LUCIDE_CLOUDY_SHAPE_FACTORY,
});

export const asLucideCloudyIcon = fixed.asHook;
export const lucideCloudyIcon = fixed.prototype;
export default lucideCloudyIcon;
