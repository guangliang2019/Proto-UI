// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'nfc' as const;
export const LUCIDE_NFC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 8.32a7.43 7.43 0 0 1 0 7.36' }),
  svg.path({ d: 'M9.46 6.21a11.76 11.76 0 0 1 0 11.58' }),
  svg.path({ d: 'M12.91 4.1a15.91 15.91 0 0 1 .01 15.8' }),
  svg.path({ d: 'M16.37 2a20.16 20.16 0 0 1 0 20' }),
];

export function renderLucideNfcIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NFC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-nfc-icon',
  prototypeName: 'lucide-nfc-icon',
  shapeFactory: LUCIDE_NFC_SHAPE_FACTORY,
});

export const asLucideNfcIcon = fixed.asHook;
export const lucideNfcIcon = fixed.prototype;
export default lucideNfcIcon;
