// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bluetooth' as const;
export const LUCIDE_BLUETOOTH_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'm7 7 10 10-5 5V2l5 5L7 17' });

export function renderLucideBluetoothIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLUETOOTH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bluetooth-icon',
  prototypeName: 'lucide-bluetooth-icon',
  shapeFactory: LUCIDE_BLUETOOTH_SHAPE_FACTORY,
});

export const asLucideBluetoothIcon = fixed.asHook;
export const lucideBluetoothIcon = fixed.prototype;
export default lucideBluetoothIcon;
