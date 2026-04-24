// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-signal' as const;
export const LUCIDE_FILE_SIGNAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M8 15h.01' }),
  svg.path({ d: 'M11.5 13.5a2.5 2.5 0 0 1 0 3' }),
  svg.path({ d: 'M15 12a5 5 0 0 1 0 6' }),
];

export function renderLucideFileSignalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_SIGNAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-signal-icon',
  prototypeName: 'lucide-file-signal-icon',
  shapeFactory: LUCIDE_FILE_SIGNAL_SHAPE_FACTORY,
});

export const asLucideFileSignalIcon = fixed.asHook;
export const lucideFileSignalIcon = fixed.prototype;
export default lucideFileSignalIcon;
