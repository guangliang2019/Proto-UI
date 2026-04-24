// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'smartphone-nfc' as const;
export const LUCIDE_SMARTPHONE_NFC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 7, height: 12, x: 2, y: 6, rx: 1 }),
  svg.path({ d: 'M13 8.32a7.43 7.43 0 0 1 0 7.36' }),
  svg.path({ d: 'M16.46 6.21a11.76 11.76 0 0 1 0 11.58' }),
  svg.path({ d: 'M19.91 4.1a15.91 15.91 0 0 1 .01 15.8' }),
];

export function renderLucideSmartphoneNfcIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SMARTPHONE_NFC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-smartphone-nfc-icon',
  prototypeName: 'lucide-smartphone-nfc-icon',
  shapeFactory: LUCIDE_SMARTPHONE_NFC_SHAPE_FACTORY,
});

export const asLucideSmartphoneNfcIcon = fixed.asHook;
export const lucideSmartphoneNfcIcon = fixed.prototype;
export default lucideSmartphoneNfcIcon;
