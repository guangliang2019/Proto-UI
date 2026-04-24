// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-stack' as const;
export const LUCIDE_FILE_STACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1' }),
  svg.path({ d: 'M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1' }),
  svg.path({
    d: 'M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z',
  }),
];

export function renderLucideFileStackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_STACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-stack-icon',
  prototypeName: 'lucide-file-stack-icon',
  shapeFactory: LUCIDE_FILE_STACK_SHAPE_FACTORY,
});

export const asLucideFileStackIcon = fixed.asHook;
export const lucideFileStackIcon = fixed.prototype;
export default lucideFileStackIcon;
