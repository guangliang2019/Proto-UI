// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radio-receiver' as const;
export const LUCIDE_RADIO_RECEIVER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 16v2' }),
  svg.path({ d: 'M19 16v2' }),
  svg.rect({ width: 20, height: 8, x: 2, y: 8, rx: 2 }),
  svg.path({ d: 'M18 12h.01' }),
];

export function renderLucideRadioReceiverIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADIO_RECEIVER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radio-receiver-icon',
  prototypeName: 'lucide-radio-receiver-icon',
  shapeFactory: LUCIDE_RADIO_RECEIVER_SHAPE_FACTORY,
});

export const asLucideRadioReceiverIcon = fixed.asHook;
export const lucideRadioReceiverIcon = fixed.prototype;
export default lucideRadioReceiverIcon;
