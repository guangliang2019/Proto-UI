// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'store' as const;
export const LUCIDE_STORE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5' }),
  svg.path({
    d: 'M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244',
  }),
  svg.path({ d: 'M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05' }),
];

export function renderLucideStoreIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STORE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-store-icon',
  prototypeName: 'lucide-store-icon',
  shapeFactory: LUCIDE_STORE_SHAPE_FACTORY,
});

export const asLucideStoreIcon = fixed.asHook;
export const lucideStoreIcon = fixed.prototype;
export default lucideStoreIcon;
