export type AnatomyFamily = {
  readonly __brand: 'AnatomyFamily';
  readonly debugName: string;
};

export type AnatomyCardinality = {
  min: number;
  max: number;
};

export type AnatomyRequirement = {
  kind: 'hook';
  name: string;
};

export type AnatomyRelation = {
  kind: 'contains';
  parent: string;
  child: string;
};

export type AnatomyRoleDecl = {
  cardinality: AnatomyCardinality;
  requires?: readonly AnatomyRequirement[];
};

export type AnatomyProfileRoleDecl = {
  cardinality?: Partial<AnatomyCardinality>;
  requires?: readonly AnatomyRequirement[];
};

export type AnatomyProfileDecl = {
  roles?: Record<string, AnatomyProfileRoleDecl>;
  relations?: readonly AnatomyRelation[];
};

export type AnatomyFamilyDecl = {
  roles: Record<string, AnatomyRoleDecl>;
  relations?: readonly AnatomyRelation[];
  profiles?: Record<string, AnatomyProfileDecl>;
};

export type AnatomyClaimDecl = {
  role: string;
  profile?: string;
};

export type AnatomyPartView = {
  readonly role: string;
  hasExpose(key: string): boolean;
  getExpose(key: string): unknown | null;
  hasHook(name: string): boolean;
};

export function createAnatomyFamily(debugName: string): AnatomyFamily {
  if (typeof debugName !== 'string' || debugName.length === 0) {
    throw new Error(`[Anatomy] debugName must be a non-empty string.`);
  }

  return Object.freeze({
    __brand: 'AnatomyFamily' as const,
    debugName,
  });
}
