// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'memory-stick' as const;
export const LUCIDE_MEMORY_STICK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12v-2' }),
  svg.path({ d: 'M12 18v-2' }),
  svg.path({ d: 'M16 12v-2' }),
  svg.path({ d: 'M16 18v-2' }),
  svg.path({ d: 'M2 11h1.5' }),
  svg.path({ d: 'M20 18v-2' }),
  svg.path({ d: 'M20.5 11H22' }),
  svg.path({ d: 'M4 18v-2' }),
  svg.path({ d: 'M8 12v-2' }),
  svg.path({ d: 'M8 18v-2' }),
  svg.rect({ x: 2, y: 6, width: 20, height: 10, rx: 2 }),
];

export function renderLucideMemoryStickIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MEMORY_STICK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-memory-stick-icon',
  prototypeName: 'lucide-memory-stick-icon',
  shapeFactory: LUCIDE_MEMORY_STICK_SHAPE_FACTORY,
});

export const asLucideMemoryStickIcon = fixed.asHook;
export const lucideMemoryStickIcon = fixed.prototype;
export default lucideMemoryStickIcon;
