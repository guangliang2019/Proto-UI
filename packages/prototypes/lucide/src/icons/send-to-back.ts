// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'send-to-back' as const;
export const LUCIDE_SEND_TO_BACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ x: 14, y: 14, width: 8, height: 8, rx: 2 }),
  svg.rect({ x: 2, y: 2, width: 8, height: 8, rx: 2 }),
  svg.path({ d: 'M7 14v1a2 2 0 0 0 2 2h1' }),
  svg.path({ d: 'M14 7h1a2 2 0 0 1 2 2v1' }),
];

export function renderLucideSendToBackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEND_TO_BACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-send-to-back-icon',
  prototypeName: 'lucide-send-to-back-icon',
  shapeFactory: LUCIDE_SEND_TO_BACK_SHAPE_FACTORY,
});

export const asLucideSendToBackIcon = fixed.asHook;
export const lucideSendToBackIcon = fixed.prototype;
export default lucideSendToBackIcon;
