// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'unplug' as const;
export const LUCIDE_UNPLUG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm19 5 3-3' }),
  svg.path({ d: 'm2 22 3-3' }),
  svg.path({ d: 'M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z' }),
  svg.path({ d: 'M7.5 13.5 10 11' }),
  svg.path({ d: 'M10.5 16.5 13 14' }),
  svg.path({ d: 'm12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z' }),
];

export function renderLucideUnplugIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNPLUG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-unplug-icon',
  prototypeName: 'lucide-unplug-icon',
  shapeFactory: LUCIDE_UNPLUG_SHAPE_FACTORY,
});

export const asLucideUnplugIcon = fixed.asHook;
export const lucideUnplugIcon = fixed.prototype;
export default lucideUnplugIcon;
