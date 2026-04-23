// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'washing-machine' as const;
export const LUCIDE_WASHING_MACHINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 6h3' }),
  svg.path({ d: 'M17 6h.01' }),
  svg.rect({ width: 18, height: 20, x: 3, y: 2, rx: 2 }),
  svg.circle({ cx: 12, cy: 13, r: 5 }),
  svg.path({ d: 'M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5' }),
];

export function renderLucideWashingMachineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WASHING_MACHINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-washing-machine-icon',
  prototypeName: 'lucide-washing-machine-icon',
  shapeFactory: LUCIDE_WASHING_MACHINE_SHAPE_FACTORY,
});

export const asLucideWashingMachineIcon = fixed.asHook;
export const lucideWashingMachineIcon = fixed.prototype;
export default lucideWashingMachineIcon;
