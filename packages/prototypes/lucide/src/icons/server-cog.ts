// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'server-cog' as const;
export const LUCIDE_SERVER_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10.852 14.772-.383.923' }),
  svg.path({ d: 'M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923' }),
  svg.path({ d: 'm13.148 9.228.383-.923' }),
  svg.path({ d: 'm13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544' }),
  svg.path({ d: 'm14.772 10.852.923-.383' }),
  svg.path({ d: 'm14.772 13.148.923.383' }),
  svg.path({ d: 'M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5' }),
  svg.path({ d: 'M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5' }),
  svg.path({ d: 'M6 18h.01' }),
  svg.path({ d: 'M6 6h.01' }),
  svg.path({ d: 'm9.228 10.852-.923-.383' }),
  svg.path({ d: 'm9.228 13.148-.923.383' }),
];

export function renderLucideServerCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SERVER_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-server-cog-icon',
  prototypeName: 'lucide-server-cog-icon',
  shapeFactory: LUCIDE_SERVER_COG_SHAPE_FACTORY,
});

export const asLucideServerCogIcon = fixed.asHook;
export const lucideServerCogIcon = fixed.prototype;
export default lucideServerCogIcon;
