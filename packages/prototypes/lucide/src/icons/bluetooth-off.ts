// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bluetooth-off' as const;
export const LUCIDE_BLUETOOTH_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 17-5 5V12l-5 5' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M14.5 9.5 17 7l-5-5v4.5' }),
];

export function renderLucideBluetoothOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLUETOOTH_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bluetooth-off-icon',
  prototypeName: 'lucide-bluetooth-off-icon',
  shapeFactory: LUCIDE_BLUETOOTH_OFF_SHAPE_FACTORY,
});

export const asLucideBluetoothOffIcon = fixed.asHook;
export const lucideBluetoothOffIcon = fixed.prototype;
export default lucideBluetoothOffIcon;
