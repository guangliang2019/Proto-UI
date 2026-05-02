// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'remove-formatting' as const;
export const LUCIDE_REMOVE_FORMATTING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 7V4h16v3' }),
  svg.path({ d: 'M5 20h6' }),
  svg.path({ d: 'M13 4 8 20' }),
  svg.path({ d: 'm15 15 5 5' }),
  svg.path({ d: 'm20 15-5 5' }),
];

export function renderLucideRemoveFormattingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REMOVE_FORMATTING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-remove-formatting-icon',
  prototypeName: 'lucide-remove-formatting-icon',
  shapeFactory: LUCIDE_REMOVE_FORMATTING_SHAPE_FACTORY,
});

export const asLucideRemoveFormattingIcon = fixed.asHook;
export const lucideRemoveFormattingIcon = fixed.prototype;
export default lucideRemoveFormattingIcon;
