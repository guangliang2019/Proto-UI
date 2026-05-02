// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'octagon-alert' as const;
export const LUCIDE_OCTAGON_ALERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 16h.01' }),
  svg.path({ d: 'M12 8v4' }),
  svg.path({
    d: 'M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z',
  }),
];

export function renderLucideOctagonAlertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_OCTAGON_ALERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-octagon-alert-icon',
  prototypeName: 'lucide-octagon-alert-icon',
  shapeFactory: LUCIDE_OCTAGON_ALERT_SHAPE_FACTORY,
});

export const asLucideOctagonAlertIcon = fixed.asHook;
export const lucideOctagonAlertIcon = fixed.prototype;
export default lucideOctagonAlertIcon;
