// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'reply-all' as const;
export const LUCIDE_REPLY_ALL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12 17-5-5 5-5' }),
  svg.path({ d: 'M22 18v-2a4 4 0 0 0-4-4H7' }),
  svg.path({ d: 'm7 17-5-5 5-5' }),
];

export function renderLucideReplyAllIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REPLY_ALL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-reply-all-icon',
  prototypeName: 'lucide-reply-all-icon',
  shapeFactory: LUCIDE_REPLY_ALL_SHAPE_FACTORY,
});

export const asLucideReplyAllIcon = fixed.asHook;
export const lucideReplyAllIcon = fixed.prototype;
export default lucideReplyAllIcon;
