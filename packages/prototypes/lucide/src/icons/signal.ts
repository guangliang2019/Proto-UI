// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signal' as const;
export const LUCIDE_SIGNAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 20h.01' }),
  svg.path({ d: 'M7 20v-4' }),
  svg.path({ d: 'M12 20v-8' }),
  svg.path({ d: 'M17 20V8' }),
  svg.path({ d: 'M22 4v16' }),
];

export function renderLucideSignalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signal-icon',
  prototypeName: 'lucide-signal-icon',
  shapeFactory: LUCIDE_SIGNAL_SHAPE_FACTORY,
});

export const asLucideSignalIcon = fixed.asHook;
export const lucideSignalIcon = fixed.prototype;
export default lucideSignalIcon;
