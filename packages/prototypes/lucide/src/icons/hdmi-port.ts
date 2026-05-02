// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hdmi-port' as const;
export const LUCIDE_HDMI_PORT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z',
  }),
  svg.path({ d: 'M7.5 12h9' }),
];

export function renderLucideHdmiPortIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HDMI_PORT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hdmi-port-icon',
  prototypeName: 'lucide-hdmi-port-icon',
  shapeFactory: LUCIDE_HDMI_PORT_SHAPE_FACTORY,
});

export const asLucideHdmiPortIcon = fixed.asHook;
export const lucideHdmiPortIcon = fixed.prototype;
export default lucideHdmiPortIcon;
