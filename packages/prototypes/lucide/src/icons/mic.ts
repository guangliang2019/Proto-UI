// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mic' as const;
export const LUCIDE_MIC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 19v3' }),
  svg.path({ d: 'M19 10v2a7 7 0 0 1-14 0v-2' }),
  svg.rect({ x: 9, y: 2, width: 6, height: 13, rx: 3 }),
];

export function renderLucideMicIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MIC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mic-icon',
  prototypeName: 'lucide-mic-icon',
  shapeFactory: LUCIDE_MIC_SHAPE_FACTORY,
});

export const asLucideMicIcon = fixed.asHook;
export const lucideMicIcon = fixed.prototype;
export default lucideMicIcon;
