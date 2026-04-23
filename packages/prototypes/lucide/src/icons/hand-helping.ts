// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hand-helping' as const;
export const LUCIDE_HAND_HELPING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14' }),
  svg.path({
    d: 'm7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9',
  }),
  svg.path({ d: 'm2 13 6 6' }),
];

export function renderLucideHandHelpingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAND_HELPING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hand-helping-icon',
  prototypeName: 'lucide-hand-helping-icon',
  shapeFactory: LUCIDE_HAND_HELPING_SHAPE_FACTORY,
});

export const asLucideHandHelpingIcon = fixed.asHook;
export const lucideHandHelpingIcon = fixed.prototype;
export default lucideHandHelpingIcon;
