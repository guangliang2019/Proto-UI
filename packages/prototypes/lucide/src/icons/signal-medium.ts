// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signal-medium' as const;
export const LUCIDE_SIGNAL_MEDIUM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 20h.01' }),
  svg.path({ d: 'M7 20v-4' }),
  svg.path({ d: 'M12 20v-8' }),
];

export function renderLucideSignalMediumIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNAL_MEDIUM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signal-medium-icon',
  prototypeName: 'lucide-signal-medium-icon',
  shapeFactory: LUCIDE_SIGNAL_MEDIUM_SHAPE_FACTORY,
});

export const asLucideSignalMediumIcon = fixed.asHook;
export const lucideSignalMediumIcon = fixed.prototype;
export default lucideSignalMediumIcon;
