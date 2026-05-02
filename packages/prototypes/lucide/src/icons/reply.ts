// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'reply' as const;
export const LUCIDE_REPLY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 18v-2a4 4 0 0 0-4-4H4' }),
  svg.path({ d: 'm9 17-5-5 5-5' }),
];

export function renderLucideReplyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REPLY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-reply-icon',
  prototypeName: 'lucide-reply-icon',
  shapeFactory: LUCIDE_REPLY_SHAPE_FACTORY,
});

export const asLucideReplyIcon = fixed.asHook;
export const lucideReplyIcon = fixed.prototype;
export default lucideReplyIcon;
