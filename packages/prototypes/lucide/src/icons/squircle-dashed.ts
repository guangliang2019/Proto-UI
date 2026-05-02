// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'squircle-dashed' as const;
export const LUCIDE_SQUIRCLE_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.77 3.043a34 34 0 0 0-3.54 0' }),
  svg.path({ d: 'M13.771 20.956a33 33 0 0 1-3.541.001' }),
  svg.path({ d: 'M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44' }),
  svg.path({ d: 'M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438' }),
  svg.path({ d: 'M20.957 10.23a33 33 0 0 1 0 3.54' }),
  svg.path({ d: 'M3.043 10.23a34 34 0 0 0 .001 3.541' }),
  svg.path({ d: 'M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438' }),
  svg.path({ d: 'M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44' }),
];

export function renderLucideSquircleDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUIRCLE_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-squircle-dashed-icon',
  prototypeName: 'lucide-squircle-dashed-icon',
  shapeFactory: LUCIDE_SQUIRCLE_DASHED_SHAPE_FACTORY,
});

export const asLucideSquircleDashedIcon = fixed.asHook;
export const lucideSquircleDashedIcon = fixed.prototype;
export default lucideSquircleDashedIcon;
