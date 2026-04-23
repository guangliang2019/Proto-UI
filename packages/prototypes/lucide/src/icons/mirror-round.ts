// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mirror-round' as const;
export const LUCIDE_MIRROR_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 6.6 8.6 8' }),
  svg.path({ d: 'M12 18v4' }),
  svg.path({ d: 'M15 7.5 9.5 13' }),
  svg.path({ d: 'M7 22h10' }),
  svg.circle({ cx: 12, cy: 10, r: 8 }),
];

export function renderLucideMirrorRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MIRROR_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mirror-round-icon',
  prototypeName: 'lucide-mirror-round-icon',
  shapeFactory: LUCIDE_MIRROR_ROUND_SHAPE_FACTORY,
});

export const asLucideMirrorRoundIcon = fixed.asHook;
export const lucideMirrorRoundIcon = fixed.prototype;
export default lucideMirrorRoundIcon;
