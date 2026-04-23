// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'code-xml' as const;
export const LUCIDE_CODE_XML_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm18 16 4-4-4-4' }),
  svg.path({ d: 'm6 8-4 4 4 4' }),
  svg.path({ d: 'm14.5 4-5 16' }),
];

export function renderLucideCodeXmlIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CODE_XML_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-code-xml-icon',
  prototypeName: 'lucide-code-xml-icon',
  shapeFactory: LUCIDE_CODE_XML_SHAPE_FACTORY,
});

export const asLucideCodeXmlIcon = fixed.asHook;
export const lucideCodeXmlIcon = fixed.prototype;
export default lucideCodeXmlIcon;
