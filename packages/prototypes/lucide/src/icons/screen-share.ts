// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'screen-share' as const;
export const LUCIDE_SCREEN_SHARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3' }),
  svg.path({ d: 'M8 21h8' }),
  svg.path({ d: 'M12 17v4' }),
  svg.path({ d: 'm17 8 5-5' }),
  svg.path({ d: 'M17 3h5v5' }),
];

export function renderLucideScreenShareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCREEN_SHARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-screen-share-icon',
  prototypeName: 'lucide-screen-share-icon',
  shapeFactory: LUCIDE_SCREEN_SHARE_SHAPE_FACTORY,
});

export const asLucideScreenShareIcon = fixed.asHook;
export const lucideScreenShareIcon = fixed.prototype;
export default lucideScreenShareIcon;
