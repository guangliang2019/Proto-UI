// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'database-zap' as const;
export const LUCIDE_DATABASE_ZAP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.ellipse({ cx: 12, cy: 5, rx: 9, ry: 3 }),
  svg.path({ d: 'M3 5V19A9 3 0 0 0 15 21.84' }),
  svg.path({ d: 'M21 5V8' }),
  svg.path({ d: 'M21 12L18 17H22L19 22' }),
  svg.path({ d: 'M3 12A9 3 0 0 0 14.59 14.87' }),
];

export function renderLucideDatabaseZapIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DATABASE_ZAP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-database-zap-icon',
  prototypeName: 'lucide-database-zap-icon',
  shapeFactory: LUCIDE_DATABASE_ZAP_SHAPE_FACTORY,
});

export const asLucideDatabaseZapIcon = fixed.asHook;
export const lucideDatabaseZapIcon = fixed.prototype;
export default lucideDatabaseZapIcon;
