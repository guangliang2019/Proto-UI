// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'trash-2' as const;
export const LUCIDE_TRASH_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 11v6' }),
  svg.path({ d: 'M14 11v6' }),
  svg.path({ d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' }),
  svg.path({ d: 'M3 6h18' }),
  svg.path({ d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }),
];

export function renderLucideTrash2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRASH_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-trash-2-icon',
  prototypeName: 'lucide-trash-2-icon',
  shapeFactory: LUCIDE_TRASH_2_SHAPE_FACTORY,
});

export const asLucideTrash2Icon = fixed.asHook;
export const lucideTrash2Icon = fixed.prototype;
export default lucideTrash2Icon;
