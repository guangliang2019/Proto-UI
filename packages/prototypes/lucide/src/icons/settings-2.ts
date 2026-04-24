// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'settings-2' as const;
export const LUCIDE_SETTINGS_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 17H5' }),
  svg.path({ d: 'M19 7h-9' }),
  svg.circle({ cx: 17, cy: 17, r: 3 }),
  svg.circle({ cx: 7, cy: 7, r: 3 }),
];

export function renderLucideSettings2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SETTINGS_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-settings-2-icon',
  prototypeName: 'lucide-settings-2-icon',
  shapeFactory: LUCIDE_SETTINGS_2_SHAPE_FACTORY,
});

export const asLucideSettings2Icon = fixed.asHook;
export const lucideSettings2Icon = fixed.prototype;
export default lucideSettings2Icon;
