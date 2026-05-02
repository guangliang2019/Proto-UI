// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'handshake' as const;
export const LUCIDE_HANDSHAKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm11 17 2 2a1 1 0 1 0 3-3' }),
  svg.path({
    d: 'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
  }),
  svg.path({ d: 'm21 3 1 11h-2' }),
  svg.path({ d: 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3' }),
  svg.path({ d: 'M3 4h8' }),
];

export function renderLucideHandshakeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HANDSHAKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-handshake-icon',
  prototypeName: 'lucide-handshake-icon',
  shapeFactory: LUCIDE_HANDSHAKE_SHAPE_FACTORY,
});

export const asLucideHandshakeIcon = fixed.asHook;
export const lucideHandshakeIcon = fixed.prototype;
export default lucideHandshakeIcon;
