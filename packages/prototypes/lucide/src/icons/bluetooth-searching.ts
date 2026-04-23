// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bluetooth-searching' as const;
export const LUCIDE_BLUETOOTH_SEARCHING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 7 10 10-5 5V2l5 5L7 17' }),
  svg.path({ d: 'M20.83 14.83a4 4 0 0 0 0-5.66' }),
  svg.path({ d: 'M18 12h.01' }),
];

export function renderLucideBluetoothSearchingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLUETOOTH_SEARCHING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bluetooth-searching-icon',
  prototypeName: 'lucide-bluetooth-searching-icon',
  shapeFactory: LUCIDE_BLUETOOTH_SEARCHING_SHAPE_FACTORY,
});

export const asLucideBluetoothSearchingIcon = fixed.asHook;
export const lucideBluetoothSearchingIcon = fixed.prototype;
export default lucideBluetoothSearchingIcon;
