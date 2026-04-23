// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-lock' as const;
export const LUCIDE_FILE_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M9 17v-2a2 2 0 0 0-4 0v2' }),
  svg.rect({ width: 8, height: 5, x: 3, y: 17, rx: 1 }),
];

export function renderLucideFileLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-lock-icon',
  prototypeName: 'lucide-file-lock-icon',
  shapeFactory: LUCIDE_FILE_LOCK_SHAPE_FACTORY,
});

export const asLucideFileLockIcon = fixed.asHook;
export const lucideFileLockIcon = fixed.prototype;
export default lucideFileLockIcon;
