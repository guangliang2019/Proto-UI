// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pen-tool' as const;
export const LUCIDE_PEN_TOOL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z',
  }),
  svg.path({
    d: 'm18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18',
  }),
  svg.path({ d: 'm2.3 2.3 7.286 7.286' }),
  svg.circle({ cx: 11, cy: 11, r: 2 }),
];

export function renderLucidePenToolIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PEN_TOOL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pen-tool-icon',
  prototypeName: 'lucide-pen-tool-icon',
  shapeFactory: LUCIDE_PEN_TOOL_SHAPE_FACTORY,
});

export const asLucidePenToolIcon = fixed.asHook;
export const lucidePenToolIcon = fixed.prototype;
export default lucidePenToolIcon;
