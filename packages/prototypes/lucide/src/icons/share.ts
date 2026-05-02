// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'share' as const;
export const LUCIDE_SHARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v13' }),
  svg.path({ d: 'm16 6-4-4-4 4' }),
  svg.path({ d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' }),
];

export function renderLucideShareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-share-icon',
  prototypeName: 'lucide-share-icon',
  shapeFactory: LUCIDE_SHARE_SHAPE_FACTORY,
});

export const asLucideShareIcon = fixed.asHook;
export const lucideShareIcon = fixed.prototype;
export default lucideShareIcon;
