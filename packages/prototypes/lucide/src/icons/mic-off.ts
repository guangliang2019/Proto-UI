// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mic-off' as const;
export const LUCIDE_MIC_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 19v3' }),
  svg.path({ d: 'M15 9.34V5a3 3 0 0 0-5.68-1.33' }),
  svg.path({ d: 'M16.95 16.95A7 7 0 0 1 5 12v-2' }),
  svg.path({ d: 'M18.89 13.23A7 7 0 0 0 19 12v-2' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M9 9v3a3 3 0 0 0 5.12 2.12' }),
];

export function renderLucideMicOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MIC_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mic-off-icon',
  prototypeName: 'lucide-mic-off-icon',
  shapeFactory: LUCIDE_MIC_OFF_SHAPE_FACTORY,
});

export const asLucideMicOffIcon = fixed.asHook;
export const lucideMicOffIcon = fixed.prototype;
export default lucideMicOffIcon;
