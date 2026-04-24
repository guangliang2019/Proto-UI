// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'id-card-lanyard' as const;
export const LUCIDE_ID_CARD_LANYARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.5 8h-3' }),
  svg.path({ d: 'm15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3' }),
  svg.path({ d: 'M16.899 22A5 5 0 0 0 7.1 22' }),
  svg.path({ d: 'm9 2 3 6' }),
  svg.circle({ cx: 12, cy: 15, r: 3 }),
];

export function renderLucideIdCardLanyardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ID_CARD_LANYARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-id-card-lanyard-icon',
  prototypeName: 'lucide-id-card-lanyard-icon',
  shapeFactory: LUCIDE_ID_CARD_LANYARD_SHAPE_FACTORY,
});

export const asLucideIdCardLanyardIcon = fixed.asHook;
export const lucideIdCardLanyardIcon = fixed.prototype;
export default lucideIdCardLanyardIcon;
