// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-box' as const;
export const LUCIDE_FILE_BOX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M11.7 14.2 7 17l-4.7-2.8' }),
  svg.path({
    d: 'M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z',
  }),
  svg.path({ d: 'M7 17v5' }),
];

export function renderLucideFileBoxIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_BOX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-box-icon',
  prototypeName: 'lucide-file-box-icon',
  shapeFactory: LUCIDE_FILE_BOX_SHAPE_FACTORY,
});

export const asLucideFileBoxIcon = fixed.asHook;
export const lucideFileBoxIcon = fixed.prototype;
export default lucideFileBoxIcon;
