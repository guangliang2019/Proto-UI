// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'computer' as const;
export const LUCIDE_COMPUTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 8, x: 5, y: 2, rx: 2 }),
  svg.rect({ width: 20, height: 8, x: 2, y: 14, rx: 2 }),
  svg.path({ d: 'M6 18h2' }),
  svg.path({ d: 'M12 18h6' }),
];

export function renderLucideComputerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COMPUTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-computer-icon',
  prototypeName: 'lucide-computer-icon',
  shapeFactory: LUCIDE_COMPUTER_SHAPE_FACTORY,
});

export const asLucideComputerIcon = fixed.asHook;
export const lucideComputerIcon = fixed.prototype;
export default lucideComputerIcon;
