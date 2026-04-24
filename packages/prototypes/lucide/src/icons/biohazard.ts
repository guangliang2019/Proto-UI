// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'biohazard' as const;
export const LUCIDE_BIOHAZARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 11.9, r: 2 }),
  svg.path({ d: 'M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6' }),
  svg.path({ d: 'm8.9 10.1 1.4.8' }),
  svg.path({ d: 'M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5' }),
  svg.path({ d: 'm15.1 10.1-1.4.8' }),
  svg.path({ d: 'M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2' }),
  svg.path({ d: 'M12 13.9v1.6' }),
  svg.path({ d: 'M13.5 5.4c-1-.2-2-.2-3 0' }),
  svg.path({ d: 'M17 16.4c.7-.7 1.2-1.6 1.5-2.5' }),
  svg.path({ d: 'M5.5 13.9c.3.9.8 1.8 1.5 2.5' }),
];

export function renderLucideBiohazardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BIOHAZARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-biohazard-icon',
  prototypeName: 'lucide-biohazard-icon',
  shapeFactory: LUCIDE_BIOHAZARD_SHAPE_FACTORY,
});

export const asLucideBiohazardIcon = fixed.asHook;
export const lucideBiohazardIcon = fixed.prototype;
export default lucideBiohazardIcon;
