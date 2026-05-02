// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'server-crash' as const;
export const LUCIDE_SERVER_CRASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2' }),
  svg.path({ d: 'M6 6h.01' }),
  svg.path({ d: 'M6 18h.01' }),
  svg.path({ d: 'm13 6-4 6h6l-4 6' }),
];

export function renderLucideServerCrashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SERVER_CRASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-server-crash-icon',
  prototypeName: 'lucide-server-crash-icon',
  shapeFactory: LUCIDE_SERVER_CRASH_SHAPE_FACTORY,
});

export const asLucideServerCrashIcon = fixed.asHook;
export const lucideServerCrashIcon = fixed.prototype;
export default lucideServerCrashIcon;
