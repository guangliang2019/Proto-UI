function mapOfficialSemanticName(semantic: string): string | null {
  switch (semantic) {
    case '@interaction/disabled':
      return 'disabled';
    case '@interaction/hovered':
      return 'hovered';
    case '@interaction/pressed':
      return 'pressed';
    case '@interaction/focused':
      return 'focused';
    case '@interaction/focusVisible':
      return 'focus-visible';
    case '@accessibility/expanded':
      return 'expanded';
    case '@accessibility/invalid':
      return 'invalid';
    case '@accessibility/selected':
      return 'selected';
    case '@accessibility/checked':
      return 'checked';
    case '@accessibility/current':
      return 'current';
    default:
      return null;
  }
}

export function createExposeStateWebNameMap(semantic: string) {
  const official = mapOfficialSemanticName(semantic);
  if (official) {
    return {
      dataAttr: `data-${official}`,
      cssVar: `--pui-${official}`,
    };
  }

  const base = semantic
    .trim()
    .replace(/\s+/g, '-')
    .replace(/\./g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9\-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  return {
    dataAttr: `data-${base}`,
    cssVar: `--pui-${base}`,
  };
}

export function createExposeStateWebNativeVariantPolicy({ semantic }: { semantic?: string }) {
  switch (semantic) {
    case '@interaction/hovered':
    case '@interaction/pressed':
    case '@accessibility/expanded':
    case '@accessibility/invalid':
    case '@accessibility/selected':
    case '@accessibility/checked':
    case '@accessibility/current':
      return true;
    case '@interaction/disabled':
    case '@interaction/focused':
    case '@interaction/focusVisible':
      return false;
    default:
      return true;
  }
}
