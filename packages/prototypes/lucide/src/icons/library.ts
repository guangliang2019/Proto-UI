// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'library' as const;
export const LUCIDE_LIBRARY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 6 4 14' }),
  svg.path({ d: 'M12 6v14' }),
  svg.path({ d: 'M8 8v12' }),
  svg.path({ d: 'M4 4v16' }),
];

export function renderLucideLibraryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIBRARY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-library-icon',
  prototypeName: 'lucide-library-icon',
  shapeFactory: LUCIDE_LIBRARY_SHAPE_FACTORY,
});

export const asLucideLibraryIcon = fixed.asHook;
export const lucideLibraryIcon = fixed.prototype;
export default lucideLibraryIcon;
