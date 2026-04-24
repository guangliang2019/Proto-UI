// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'workflow' as const;
export const LUCIDE_WORKFLOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 8, height: 8, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7 11v4a2 2 0 0 0 2 2h4' }),
  svg.rect({ width: 8, height: 8, x: 13, y: 13, rx: 2 }),
];

export function renderLucideWorkflowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WORKFLOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-workflow-icon',
  prototypeName: 'lucide-workflow-icon',
  shapeFactory: LUCIDE_WORKFLOW_SHAPE_FACTORY,
});

export const asLucideWorkflowIcon = fixed.asHook;
export const lucideWorkflowIcon = fixed.prototype;
export default lucideWorkflowIcon;
