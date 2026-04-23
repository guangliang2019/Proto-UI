// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'plug-zap' as const;
export const LUCIDE_PLUG_ZAP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z' }),
  svg.path({ d: 'm2 22 3-3' }),
  svg.path({ d: 'M7.5 13.5 10 11' }),
  svg.path({ d: 'M10.5 16.5 13 14' }),
  svg.path({ d: 'm18 3-4 4h6l-4 4' }),
];

export function renderLucidePlugZapIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PLUG_ZAP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-plug-zap-icon',
  prototypeName: 'lucide-plug-zap-icon',
  shapeFactory: LUCIDE_PLUG_ZAP_SHAPE_FACTORY,
});

export const asLucidePlugZapIcon = fixed.asHook;
export const lucidePlugZapIcon = fixed.prototype;
export default lucidePlugZapIcon;
