// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hourglass' as const;
export const LUCIDE_HOURGLASS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 22h14' }),
  svg.path({ d: 'M5 2h14' }),
  svg.path({ d: 'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22' }),
  svg.path({ d: 'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2' }),
];

export function renderLucideHourglassIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOURGLASS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hourglass-icon',
  prototypeName: 'lucide-hourglass-icon',
  shapeFactory: LUCIDE_HOURGLASS_SHAPE_FACTORY,
});

export const asLucideHourglassIcon = fixed.asHook;
export const lucideHourglassIcon = fixed.prototype;
export default lucideHourglassIcon;
