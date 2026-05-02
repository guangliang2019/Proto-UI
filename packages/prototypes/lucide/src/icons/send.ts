// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'send' as const;
export const LUCIDE_SEND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
  }),
  svg.path({ d: 'm21.854 2.147-10.94 10.939' }),
];

export function renderLucideSendIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-send-icon',
  prototypeName: 'lucide-send-icon',
  shapeFactory: LUCIDE_SEND_SHAPE_FACTORY,
});

export const asLucideSendIcon = fixed.asHook;
export const lucideSendIcon = fixed.prototype;
export default lucideSendIcon;
