// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'usb' as const;
export const LUCIDE_USB_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 10, cy: 7, r: 1 }),
  svg.circle({ cx: 4, cy: 20, r: 1 }),
  svg.path({ d: 'M4.7 19.3 19 5' }),
  svg.path({ d: 'm21 3-3 1 2 2Z' }),
  svg.path({ d: 'M9.26 7.68 5 12l2 5' }),
  svg.path({ d: 'm10 14 5 2 3.5-3.5' }),
  svg.path({ d: 'm18 12 1-1 1 1-1 1Z' }),
];

export function renderLucideUsbIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USB_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-usb-icon',
  prototypeName: 'lucide-usb-icon',
  shapeFactory: LUCIDE_USB_SHAPE_FACTORY,
});

export const asLucideUsbIcon = fixed.asHook;
export const lucideUsbIcon = fixed.prototype;
export default lucideUsbIcon;
