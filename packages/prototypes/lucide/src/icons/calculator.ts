// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'calculator' as const;
export const LUCIDE_CALCULATOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 16, height: 20, x: 4, y: 2, rx: 2 }),
  svg.line({ x1: 8, x2: 16, y1: 6, y2: 6 }),
  svg.line({ x1: 16, x2: 16, y1: 14, y2: 18 }),
  svg.path({ d: 'M16 10h.01' }),
  svg.path({ d: 'M12 10h.01' }),
  svg.path({ d: 'M8 10h.01' }),
  svg.path({ d: 'M12 14h.01' }),
  svg.path({ d: 'M8 14h.01' }),
  svg.path({ d: 'M12 18h.01' }),
  svg.path({ d: 'M8 18h.01' }),
];

export function renderLucideCalculatorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CALCULATOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-calculator-icon',
  prototypeName: 'lucide-calculator-icon',
  shapeFactory: LUCIDE_CALCULATOR_SHAPE_FACTORY,
});

export const asLucideCalculatorIcon = fixed.asHook;
export const lucideCalculatorIcon = fixed.prototype;
export default lucideCalculatorIcon;
