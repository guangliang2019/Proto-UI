// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'factory' as const;
export const LUCIDE_FACTORY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 16h.01' }),
  svg.path({ d: 'M16 16h.01' }),
  svg.path({
    d: 'M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z',
  }),
  svg.path({ d: 'M8 16h.01' }),
];

export function renderLucideFactoryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FACTORY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-factory-icon',
  prototypeName: 'lucide-factory-icon',
  shapeFactory: LUCIDE_FACTORY_SHAPE_FACTORY,
});

export const asLucideFactoryIcon = fixed.asHook;
export const lucideFactoryIcon = fixed.prototype;
export default lucideFactoryIcon;
