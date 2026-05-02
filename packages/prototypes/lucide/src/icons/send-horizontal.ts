// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'send-horizontal' as const;
export const LUCIDE_SEND_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z',
  }),
  svg.path({ d: 'M6 12h16' }),
];

export function renderLucideSendHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEND_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-send-horizontal-icon',
  prototypeName: 'lucide-send-horizontal-icon',
  shapeFactory: LUCIDE_SEND_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideSendHorizontalIcon = fixed.asHook;
export const lucideSendHorizontalIcon = fixed.prototype;
export default lucideSendHorizontalIcon;
