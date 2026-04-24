// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'regex' as const;
export const LUCIDE_REGEX_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 3v10' }),
  svg.path({ d: 'm12.67 5.5 8.66 5' }),
  svg.path({ d: 'm12.67 10.5 8.66-5' }),
  svg.path({ d: 'M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z' }),
];

export function renderLucideRegexIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REGEX_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-regex-icon',
  prototypeName: 'lucide-regex-icon',
  shapeFactory: LUCIDE_REGEX_SHAPE_FACTORY,
});

export const asLucideRegexIcon = fixed.asHook;
export const lucideRegexIcon = fixed.prototype;
export default lucideRegexIcon;
