// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ethernet-port' as const;
export const LUCIDE_ETHERNET_PORT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z',
  }),
  svg.path({ d: 'M6 8v1' }),
  svg.path({ d: 'M10 8v1' }),
  svg.path({ d: 'M14 8v1' }),
  svg.path({ d: 'M18 8v1' }),
];

export function renderLucideEthernetPortIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ETHERNET_PORT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ethernet-port-icon',
  prototypeName: 'lucide-ethernet-port-icon',
  shapeFactory: LUCIDE_ETHERNET_PORT_SHAPE_FACTORY,
});

export const asLucideEthernetPortIcon = fixed.asHook;
export const lucideEthernetPortIcon = fixed.prototype;
export default lucideEthernetPortIcon;
