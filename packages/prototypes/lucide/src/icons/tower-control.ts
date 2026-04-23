// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tower-control' as const;
export const LUCIDE_TOWER_CONTROL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z' }),
  svg.path({ d: 'M8 13v9' }),
  svg.path({ d: 'M16 22v-9' }),
  svg.path({ d: 'm9 6 1 7' }),
  svg.path({ d: 'm15 6-1 7' }),
  svg.path({ d: 'M12 6V2' }),
  svg.path({ d: 'M13 2h-2' }),
];

export function renderLucideTowerControlIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOWER_CONTROL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tower-control-icon',
  prototypeName: 'lucide-tower-control-icon',
  shapeFactory: LUCIDE_TOWER_CONTROL_SHAPE_FACTORY,
});

export const asLucideTowerControlIcon = fixed.asHook;
export const lucideTowerControlIcon = fixed.prototype;
export default lucideTowerControlIcon;
