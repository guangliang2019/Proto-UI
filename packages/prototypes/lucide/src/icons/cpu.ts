// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cpu' as const;
export const LUCIDE_CPU_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20v2' }),
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'M17 20v2' }),
  svg.path({ d: 'M17 2v2' }),
  svg.path({ d: 'M2 12h2' }),
  svg.path({ d: 'M2 17h2' }),
  svg.path({ d: 'M2 7h2' }),
  svg.path({ d: 'M20 12h2' }),
  svg.path({ d: 'M20 17h2' }),
  svg.path({ d: 'M20 7h2' }),
  svg.path({ d: 'M7 20v2' }),
  svg.path({ d: 'M7 2v2' }),
  svg.rect({ x: 4, y: 4, width: 16, height: 16, rx: 2 }),
  svg.rect({ x: 8, y: 8, width: 8, height: 8, rx: 1 }),
];

export function renderLucideCpuIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CPU_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cpu-icon',
  prototypeName: 'lucide-cpu-icon',
  shapeFactory: LUCIDE_CPU_SHAPE_FACTORY,
});

export const asLucideCpuIcon = fixed.asHook;
export const lucideCpuIcon = fixed.prototype;
export default lucideCpuIcon;
