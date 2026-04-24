// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'logs' as const;
export const LUCIDE_LOGS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5h1' }),
  svg.path({ d: 'M3 12h1' }),
  svg.path({ d: 'M3 19h1' }),
  svg.path({ d: 'M8 5h1' }),
  svg.path({ d: 'M8 12h1' }),
  svg.path({ d: 'M8 19h1' }),
  svg.path({ d: 'M13 5h8' }),
  svg.path({ d: 'M13 12h8' }),
  svg.path({ d: 'M13 19h8' }),
];

export function renderLucideLogsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOGS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-logs-icon',
  prototypeName: 'lucide-logs-icon',
  shapeFactory: LUCIDE_LOGS_SHAPE_FACTORY,
});

export const asLucideLogsIcon = fixed.asHook;
export const lucideLogsIcon = fixed.prototype;
export default lucideLogsIcon;
