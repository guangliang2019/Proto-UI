// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'notebook-text' as const;
export const LUCIDE_NOTEBOOK_TEXT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 6h4' }),
  svg.path({ d: 'M2 10h4' }),
  svg.path({ d: 'M2 14h4' }),
  svg.path({ d: 'M2 18h4' }),
  svg.rect({ width: 16, height: 20, x: 4, y: 2, rx: 2 }),
  svg.path({ d: 'M9.5 8h5' }),
  svg.path({ d: 'M9.5 12H16' }),
  svg.path({ d: 'M9.5 16H14' }),
];

export function renderLucideNotebookTextIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_NOTEBOOK_TEXT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-notebook-text-icon',
  prototypeName: 'lucide-notebook-text-icon',
  shapeFactory: LUCIDE_NOTEBOOK_TEXT_SHAPE_FACTORY,
});

export const asLucideNotebookTextIcon = fixed.asHook;
export const lucideNotebookTextIcon = fixed.prototype;
export default lucideNotebookTextIcon;
