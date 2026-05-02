import type {
  RendererHandle,
  SvgFactories,
  SvgTemplateNode,
  TemplateChildren,
} from '@proto.ui/core';

export type LucideShapeFactory = (svg: SvgFactories) => TemplateChildren;

export interface LucideVisualProps {
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}

export type SvgRendererHandle = Pick<RendererHandle<any>, 'svg'>;
export type SvgRenderResult = SvgTemplateNode;
