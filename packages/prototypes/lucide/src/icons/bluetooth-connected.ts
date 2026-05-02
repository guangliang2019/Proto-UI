// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bluetooth-connected' as const;
export const LUCIDE_BLUETOOTH_CONNECTED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 7 10 10-5 5V2l5 5L7 17' }),
  svg.line({ x1: 18, x2: 21, y1: 12, y2: 12 }),
  svg.line({ x1: 3, x2: 6, y1: 12, y2: 12 }),
];

export function renderLucideBluetoothConnectedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLUETOOTH_CONNECTED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bluetooth-connected-icon',
  prototypeName: 'lucide-bluetooth-connected-icon',
  shapeFactory: LUCIDE_BLUETOOTH_CONNECTED_SHAPE_FACTORY,
});

export const asLucideBluetoothConnectedIcon = fixed.asHook;
export const lucideBluetoothConnectedIcon = fixed.prototype;
export default lucideBluetoothConnectedIcon;
