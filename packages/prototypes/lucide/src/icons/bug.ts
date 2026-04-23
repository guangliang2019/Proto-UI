// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bug' as const;
export const LUCIDE_BUG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20v-9' }),
  svg.path({ d: 'M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z' }),
  svg.path({ d: 'M14.12 3.88 16 2' }),
  svg.path({ d: 'M21 21a4 4 0 0 0-3.81-4' }),
  svg.path({ d: 'M21 5a4 4 0 0 1-3.55 3.97' }),
  svg.path({ d: 'M22 13h-4' }),
  svg.path({ d: 'M3 21a4 4 0 0 1 3.81-4' }),
  svg.path({ d: 'M3 5a4 4 0 0 0 3.55 3.97' }),
  svg.path({ d: 'M6 13H2' }),
  svg.path({ d: 'm8 2 1.88 1.88' }),
  svg.path({ d: 'M9 7.13V6a3 3 0 1 1 6 0v1.13' }),
];

export function renderLucideBugIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BUG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bug-icon',
  prototypeName: 'lucide-bug-icon',
  shapeFactory: LUCIDE_BUG_SHAPE_FACTORY,
});

export const asLucideBugIcon = fixed.asHook;
export const lucideBugIcon = fixed.prototype;
export default lucideBugIcon;
