// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'notebook-pen' as const;
export const LUCIDE_NOTEBOOK_PEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4' }),
  svg.path({ d: 'M2 6h4' }),
  svg.path({ d: 'M2 10h4' }),
  svg.path({ d: 'M2 14h4' }),
  svg.path({ d: 'M2 18h4' }),
  svg.path({
    d: 'M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
  }),
];

export function renderLucideNotebookPenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NOTEBOOK_PEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-notebook-pen-icon',
  prototypeName: 'lucide-notebook-pen-icon',
  shapeFactory: LUCIDE_NOTEBOOK_PEN_SHAPE_FACTORY,
});

export const asLucideNotebookPenIcon = fixed.asHook;
export const lucideNotebookPenIcon = fixed.prototype;
export default lucideNotebookPenIcon;
