// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-square-dashed' as const;
export const LUCIDE_MESSAGE_SQUARE_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 3h2' }),
  svg.path({ d: 'M16 19h-2' }),
  svg.path({ d: 'M2 12v-2' }),
  svg.path({ d: 'M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149' }),
  svg.path({ d: 'M20 19a2 2 0 0 0 2-2v-1' }),
  svg.path({ d: 'M22 10v2' }),
  svg.path({ d: 'M22 6V5a2 2 0 0 0-2-2' }),
  svg.path({ d: 'M4 3a2 2 0 0 0-2 2v1' }),
  svg.path({ d: 'M8 19h2' }),
  svg.path({ d: 'M8 3h2' }),
];

export function renderLucideMessageSquareDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_SQUARE_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-square-dashed-icon',
  prototypeName: 'lucide-message-square-dashed-icon',
  shapeFactory: LUCIDE_MESSAGE_SQUARE_DASHED_SHAPE_FACTORY,
});

export const asLucideMessageSquareDashedIcon = fixed.asHook;
export const lucideMessageSquareDashedIcon = fixed.prototype;
export default lucideMessageSquareDashedIcon;
