// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'import' as const;
export const LUCIDE_IMPORT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v12' }),
  svg.path({ d: 'm8 11 4 4 4-4' }),
  svg.path({ d: 'M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4' }),
];

export function renderLucideImportIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMPORT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-import-icon',
  prototypeName: 'lucide-import-icon',
  shapeFactory: LUCIDE_IMPORT_SHAPE_FACTORY,
});

export const asLucideImportIcon = fixed.asHook;
export const lucideImportIcon = fixed.prototype;
export default lucideImportIcon;
