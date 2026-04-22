import type { RendererHandle, SvgTemplateNode } from '@proto.ui/core';
import { LUCIDE_ICON_REGISTRY, type LucideIconName } from './icons';

export interface RenderLucideIconOptions {
  name: LucideIconName;
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
}

type SvgRendererHandle = Pick<RendererHandle<any>, 'svg'>;

function normalizePositiveNumber(value: unknown, fallback: number): number {
  if (typeof value !== 'number') return fallback;
  if (!Number.isFinite(value)) return fallback;
  if (value <= 0) return fallback;
  return value;
}

export function renderLucideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideIconOptions
): SvgTemplateNode {
  const shapeFactory = LUCIDE_ICON_REGISTRY[options.name];
  const size = normalizePositiveNumber(options.size, 24);
  const strokeWidth = normalizePositiveNumber(options.strokeWidth, 2);
  const stroke = options.stroke ?? 'currentColor';
  const fill = options.fill ?? 'none';

  return renderer.svg.root(
    {
      viewBox: '0 0 24 24',
      width: size,
      height: size,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    shapeFactory(renderer.svg)
  );
}
