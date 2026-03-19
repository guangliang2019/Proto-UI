import type {
  AnatomyCardinality,
  AnatomyClaimDecl,
  AnatomyFamily,
  AnatomyFamilyDecl,
  AnatomyPartView,
  Prototype,
  ProtoPhase,
  CapsVaultView,
} from '@proto-ui/core';
import { illegalPhase } from '@proto-ui/core';
import { ModuleBase } from '@proto-ui/modules.base';
import type { ExposePort } from '@proto-ui/modules.expose';

import {
  ANATOMY_GET_PROTO_CAP,
  ANATOMY_INSTANCE_TOKEN_CAP,
  ANATOMY_PARENT_CAP,
  type AnatomyInstanceToken,
  type AnatomyParentGetter,
  type AnatomyPrototypeGetter,
} from './caps';
import { ANATOMY_ERROR, anatomyError } from './error';
import type { AnatomyDiagnostic } from './types';

type HookTraceEntry = { name?: string };

type RoleState = {
  cardinality: AnatomyCardinality;
  requires: readonly { kind: 'hook'; name: string }[];
};

type NormalizedProfile = {
  name: string;
  roles: Record<string, RoleState>;
  relations: Array<{ kind: 'contains'; parent: string; child: string }>;
};

type NormalizedFamily = {
  roles: Record<string, RoleState>;
  relations: Array<{ kind: 'contains'; parent: string; child: string }>;
  profiles: Record<string, NormalizedProfile>;
};

type ClaimRecord = {
  instance: AnatomyInstanceToken;
  family: AnatomyFamily;
  role: string;
  profile?: string;
  prototype: Prototype<any> | null;
  exposePort: ExposePort;
};

const CENTER = (() => {
  const families = new Map<AnatomyFamily, NormalizedFamily>();
  const claimsByInstance = new Map<AnatomyInstanceToken, Map<AnatomyFamily, ClaimRecord>>();

  const getClaim = (instance: AnatomyInstanceToken, family: AnatomyFamily) =>
    claimsByInstance.get(instance)?.get(family) ?? null;

  return {
    setFamily(family: AnatomyFamily, def: NormalizedFamily) {
      families.set(family, def);
    },
    getFamily(family: AnatomyFamily) {
      return families.get(family) ?? null;
    },
    setClaim(record: ClaimRecord) {
      let byFamily = claimsByInstance.get(record.instance);
      if (!byFamily) {
        byFamily = new Map();
        claimsByInstance.set(record.instance, byFamily);
      }
      byFamily.set(record.family, record);
    },
    getClaim,
    deleteClaim(instance: AnatomyInstanceToken, family: AnatomyFamily) {
      const byFamily = claimsByInstance.get(instance);
      if (!byFamily) return;
      byFamily.delete(family);
      if (byFamily.size === 0) claimsByInstance.delete(instance);
    },
    listClaims(family: AnatomyFamily): ClaimRecord[] {
      const out: ClaimRecord[] = [];
      for (const byFamily of claimsByInstance.values()) {
        const claim = byFamily.get(family);
        if (claim) out.push(claim);
      }
      return out;
    },
  };
})();

function cloneCardinality(cardinality: AnatomyCardinality): AnatomyCardinality {
  return { min: cardinality.min, max: cardinality.max };
}

function normalizeCardinality(
  cardinality: Partial<AnatomyCardinality> | AnatomyCardinality
): AnatomyCardinality {
  const min = cardinality.min;
  const max = cardinality.max;
  if (typeof min !== 'number' || Number.isNaN(min) || min < 0) {
    throw anatomyError(ANATOMY_ERROR.FAMILY_INVALID, `[Anatomy] invalid cardinality.min`);
  }
  if (typeof max !== 'number' || Number.isNaN(max) || max < min) {
    throw anatomyError(ANATOMY_ERROR.FAMILY_INVALID, `[Anatomy] invalid cardinality.max`);
  }
  return { min, max };
}

function normalizeRequires(
  requires?: readonly { kind: 'hook'; name: string }[]
): readonly { kind: 'hook'; name: string }[] {
  if (!requires) return [];
  for (const req of requires) {
    if (req?.kind !== 'hook' || typeof req.name !== 'string' || req.name.length === 0) {
      throw anatomyError(ANATOMY_ERROR.FAMILY_INVALID, `[Anatomy] invalid requirement`);
    }
  }
  return requires.slice();
}

function normalizeFamily(decl: AnatomyFamilyDecl): NormalizedFamily {
  const roles: Record<string, RoleState> = {};
  for (const [role, roleDecl] of Object.entries(decl.roles ?? {})) {
    roles[role] = {
      cardinality: normalizeCardinality(roleDecl.cardinality),
      requires: normalizeRequires(roleDecl.requires),
    };
  }

  const relations = (decl.relations ?? []).map((it) => ({
    kind: 'contains' as const,
    parent: it.parent,
    child: it.child,
  }));

  const profiles: Record<string, NormalizedProfile> = {};
  for (const [name, profileDecl] of Object.entries(decl.profiles ?? {})) {
    const nextRoles: Record<string, RoleState> = {};
    for (const [role, baseRole] of Object.entries(roles)) {
      const patch = profileDecl.roles?.[role];
      const nextCardinality = cloneCardinality(baseRole.cardinality);
      if (patch?.cardinality) {
        if (typeof patch.cardinality.min === 'number') nextCardinality.min = patch.cardinality.min;
        if (typeof patch.cardinality.max === 'number') nextCardinality.max = patch.cardinality.max;
      }
      if (
        nextCardinality.min < baseRole.cardinality.min ||
        nextCardinality.max > baseRole.cardinality.max
      ) {
        throw anatomyError(
          ANATOMY_ERROR.FAMILY_INVALID,
          `[Anatomy] profile '${name}' cannot relax family cardinality for role '${role}'`
        );
      }
      nextRoles[role] = {
        cardinality: normalizeCardinality(nextCardinality),
        requires: [...baseRole.requires, ...normalizeRequires(patch?.requires)],
      };
    }
    profiles[name] = {
      name,
      roles: nextRoles,
      relations: [...relations, ...((profileDecl.relations ?? []) as any)],
    };
  }

  return { roles, relations, profiles };
}

function getHookNames(proto: Prototype<any> | null): Set<string> {
  const trace = (proto as any)?.__asHooks as HookTraceEntry[] | undefined;
  const names = new Set<string>();
  if (!Array.isArray(trace)) return names;
  for (const entry of trace) {
    if (typeof entry?.name === 'string' && entry.name) names.add(entry.name);
  }
  return names;
}

export class AnatomyModuleImpl extends ModuleBase {
  private readonly prototypeName: string;
  private readonly exposePort: ExposePort;
  private disposed = false;
  private claimFamilies = new Set<AnatomyFamily>();

  constructor(caps: CapsVaultView, prototypeName: string, exposePort: ExposePort) {
    super(caps);
    this.prototypeName = prototypeName;
    this.exposePort = exposePort;
  }

  family(family: AnatomyFamily, decl: AnatomyFamilyDecl): void {
    this.ensureSetup('def.anatomy.family');
    CENTER.setFamily(family, normalizeFamily(decl));
  }

  claim(family: AnatomyFamily, decl: AnatomyClaimDecl): void {
    this.ensureSetup('def.anatomy.claim');

    const familyDef = CENTER.getFamily(family);
    if (!familyDef) {
      throw anatomyError(
        ANATOMY_ERROR.CLAIM_INVALID,
        `[Anatomy] family not registered: ${family.debugName}`
      );
    }
    if (!familyDef.roles[decl.role]) {
      throw anatomyError(
        ANATOMY_ERROR.CLAIM_INVALID,
        `[Anatomy] unknown role '${decl.role}' in family '${family.debugName}'`
      );
    }
    if (decl.profile && decl.role !== 'root') {
      throw anatomyError(
        ANATOMY_ERROR.CLAIM_INVALID,
        `[Anatomy] only root claim may specify profile`
      );
    }
    if (decl.profile && !familyDef.profiles[decl.profile]) {
      throw anatomyError(
        ANATOMY_ERROR.CLAIM_INVALID,
        `[Anatomy] unknown profile '${decl.profile}' in family '${family.debugName}'`
      );
    }

    const instance = this.getSelfToken();
    if (CENTER.getClaim(instance, family)) {
      throw anatomyError(
        ANATOMY_ERROR.CLAIM_INVALID,
        `[Anatomy] duplicate claim for family '${family.debugName}'`
      );
    }

    CENTER.setClaim({
      instance,
      family,
      role: decl.role,
      profile: decl.profile,
      prototype: this.getPrototypeGetter()(instance),
      exposePort: this.exposePort,
    });
    this.claimFamilies.add(family);
  }

  has(family: AnatomyFamily, role: string): boolean {
    this.ensureCallback('run.anatomy.has');
    return this.partsOf(family, role).length > 0;
  }

  parts(family: AnatomyFamily): readonly AnatomyPartView[] {
    this.ensureCallback('run.anatomy.parts');
    const domain = this.resolveCurrentDomain(family);
    return domain.claims.map((claim) => this.toPartView(claim));
  }

  partsOf(family: AnatomyFamily, role: string): readonly AnatomyPartView[] {
    this.ensureCallback('run.anatomy.partsOf');
    const domain = this.resolveCurrentDomain(family);
    return domain.claims
      .filter((claim) => claim.role === role)
      .map((claim) => this.toPartView(claim));
  }

  readonly port = {
    getDiagnostics: (): readonly AnatomyDiagnostic[] => {
      const out: AnatomyDiagnostic[] = [];
      for (const family of this.claimFamilies) {
        out.push(...this.computeDiagnostics(family));
      }
      return out;
    },
  };

  override onProtoPhase(phase: ProtoPhase): void {
    super.onProtoPhase(phase);
    if (phase === 'unmounted') this.dispose();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.claimFamilies.size === 0) return;
    if (!this.caps.has(ANATOMY_INSTANCE_TOKEN_CAP)) return;

    const instance = this.caps.get(ANATOMY_INSTANCE_TOKEN_CAP) as AnatomyInstanceToken;
    for (const family of this.claimFamilies) {
      CENTER.deleteClaim(instance, family);
    }
    this.claimFamilies.clear();
  }

  private computeDiagnostics(family: AnatomyFamily): AnatomyDiagnostic[] {
    const familyDef = CENTER.getFamily(family);
    if (!familyDef) return [];

    const domain = this.resolveCurrentDomain(family, false);
    const claims = domain.claims;
    const diagnostics: AnatomyDiagnostic[] = [];
    const counts = new Map<string, number>();
    for (const claim of claims) counts.set(claim.role, (counts.get(claim.role) ?? 0) + 1);

    for (const [role, roleState] of Object.entries(familyDef.roles)) {
      const count = counts.get(role) ?? 0;
      if (count < roleState.cardinality.min) {
        diagnostics.push({
          level: 'error',
          scope: 'family',
          code: 'ANATOMY_FAMILY_MIN',
          message: `[Anatomy] role '${role}' is below family min in '${family.debugName}'`,
          family,
          role,
        });
      }
      if (count > roleState.cardinality.max) {
        diagnostics.push({
          level: 'error',
          scope: 'family',
          code: 'ANATOMY_FAMILY_MAX',
          message: `[Anatomy] role '${role}' exceeds family max in '${family.debugName}'`,
          family,
          role,
        });
      }
    }

    for (const claim of claims) {
      const familyRole = familyDef.roles[claim.role];
      for (const req of familyRole?.requires ?? []) {
        if (!getHookNames(claim.prototype).has(req.name)) {
          diagnostics.push({
            level: 'error',
            scope: 'family',
            code: 'ANATOMY_FAMILY_HOOK_REQUIRED',
            message: `[Anatomy] role '${claim.role}' requires hook '${req.name}'`,
            family,
            role: claim.role,
          });
        }
      }
    }

    for (const relation of familyDef.relations) {
      for (const claim of claims.filter((it) => it.role === relation.child)) {
        if (!this.hasAncestorRole(claim.instance, family, relation.parent, domain.rootInstance)) {
          diagnostics.push({
            level: 'error',
            scope: 'family',
            code: 'ANATOMY_FAMILY_RELATION',
            message: `[Anatomy] role '${relation.child}' must be contained by '${relation.parent}'`,
            family,
            role: relation.child,
          });
        }
      }
    }

    const profileName = domain.profile;
    if (!profileName) return diagnostics;
    const profile = familyDef.profiles[profileName];
    if (!profile) return diagnostics;

    for (const [role, roleState] of Object.entries(profile.roles)) {
      const count = counts.get(role) ?? 0;
      if (count < roleState.cardinality.min) {
        diagnostics.push({
          level: 'warning',
          scope: 'profile',
          code: 'ANATOMY_PROFILE_MIN',
          message: `[Anatomy] role '${role}' is below profile min in '${family.debugName}/${profileName}'`,
          family,
          role,
          profile: profileName,
        });
      }
      if (count > roleState.cardinality.max) {
        diagnostics.push({
          level: 'warning',
          scope: 'profile',
          code: 'ANATOMY_PROFILE_MAX',
          message: `[Anatomy] role '${role}' exceeds profile max in '${family.debugName}/${profileName}'`,
          family,
          role,
          profile: profileName,
        });
      }
    }

    for (const claim of claims) {
      const profileRole = profile.roles[claim.role];
      const familyReqNames = new Set(
        (familyDef.roles[claim.role]?.requires ?? []).map((it) => it.name)
      );
      for (const req of profileRole?.requires ?? []) {
        if (familyReqNames.has(req.name)) continue;
        if (!getHookNames(claim.prototype).has(req.name)) {
          diagnostics.push({
            level: 'warning',
            scope: 'profile',
            code: 'ANATOMY_PROFILE_HOOK_REQUIRED',
            message: `[Anatomy] role '${claim.role}' is missing profile hook '${req.name}'`,
            family,
            role: claim.role,
            profile: profileName,
          });
        }
      }
    }

    for (const relation of profile.relations.slice(familyDef.relations.length)) {
      for (const claim of claims.filter((it) => it.role === relation.child)) {
        if (!this.hasAncestorRole(claim.instance, family, relation.parent, domain.rootInstance)) {
          diagnostics.push({
            level: 'warning',
            scope: 'profile',
            code: 'ANATOMY_PROFILE_RELATION',
            message: `[Anatomy] role '${relation.child}' should be contained by '${relation.parent}'`,
            family,
            role: relation.child,
            profile: profileName,
          });
        }
      }
    }

    return diagnostics;
  }

  private resolveCurrentDomain(
    family: AnatomyFamily,
    strict = true
  ): {
    rootInstance: AnatomyInstanceToken | null;
    claims: ClaimRecord[];
    profile: string | null;
  } {
    const instance = this.getSelfToken();
    const rootInstance = this.findDomainRoot(instance, family);
    if (!rootInstance) {
      if (!strict) return { rootInstance: null, claims: [], profile: null };
      throw anatomyError(
        ANATOMY_ERROR.CLAIM_INVALID,
        `[Anatomy] current instance is not part of a valid domain for '${family.debugName}'`
      );
    }

    const claims = CENTER.listClaims(family).filter(
      (claim) => this.findDomainRoot(claim.instance, family) === rootInstance
    );
    const rootClaim =
      claims.find((claim) => claim.role === 'root' && claim.instance === rootInstance) ?? null;
    return {
      rootInstance,
      claims,
      profile: rootClaim?.profile ?? null,
    };
  }

  private findDomainRoot(
    instance: AnatomyInstanceToken,
    family: AnatomyFamily
  ): AnatomyInstanceToken | null {
    const getParent = this.getParentGetter();
    let cur: AnatomyInstanceToken | null = instance;
    while (cur) {
      const claim = CENTER.getClaim(cur, family);
      if (claim?.role === 'root') return cur;
      cur = getParent(cur);
    }
    return null;
  }

  private hasAncestorRole(
    instance: AnatomyInstanceToken,
    family: AnatomyFamily,
    role: string,
    domainRoot: AnatomyInstanceToken | null
  ): boolean {
    const getParent = this.getParentGetter();
    let cur = getParent(instance);
    while (cur) {
      const claim = CENTER.getClaim(cur, family);
      if (claim?.role === role) return true;
      if (domainRoot && cur === domainRoot) break;
      cur = getParent(cur);
    }
    return false;
  }

  private toPartView(claim: ClaimRecord): AnatomyPartView {
    return {
      role: claim.role,
      hasExpose: (key: string) => claim.exposePort.has(key),
      getExpose: (key: string) =>
        claim.exposePort.has(key) ? (claim.exposePort.get(key) ?? null) : null,
      hasHook: (name: string) => getHookNames(claim.prototype).has(name),
    };
  }

  private ensureSetup(op: string) {
    if (this.sys) {
      try {
        this.sys.ensureSetup(op);
        return;
      } catch (error) {
        throw anatomyError(ANATOMY_ERROR.PHASE, `[Anatomy] setup-only: ${op}`);
      }
    }
    if (this.protoPhase !== 'setup') {
      throw illegalPhase(op, this.protoPhase, { prototypeName: this.prototypeName });
    }
  }

  private ensureCallback(op: string) {
    if (this.sys) {
      try {
        this.sys.ensureCallback(op);
        return;
      } catch {
        throw anatomyError(ANATOMY_ERROR.PHASE, `[Anatomy] callback-only: ${op}`);
      }
    }
    if (this.protoPhase === 'setup') {
      throw illegalPhase(op, this.protoPhase, { prototypeName: this.prototypeName });
    }
  }

  private getSelfToken(): AnatomyInstanceToken {
    if (!this.caps.has(ANATOMY_INSTANCE_TOKEN_CAP)) {
      throw anatomyError(ANATOMY_ERROR.CAP, `[Anatomy] host caps missing: instance token`);
    }
    return this.caps.get(ANATOMY_INSTANCE_TOKEN_CAP) as AnatomyInstanceToken;
  }

  private getParentGetter(): AnatomyParentGetter {
    if (!this.caps.has(ANATOMY_PARENT_CAP)) {
      throw anatomyError(ANATOMY_ERROR.CAP, `[Anatomy] host caps missing: parent getter`);
    }
    return this.caps.get(ANATOMY_PARENT_CAP) as AnatomyParentGetter;
  }

  private getPrototypeGetter(): AnatomyPrototypeGetter {
    if (!this.caps.has(ANATOMY_GET_PROTO_CAP)) {
      throw anatomyError(ANATOMY_ERROR.CAP, `[Anatomy] host caps missing: prototype getter`);
    }
    return this.caps.get(ANATOMY_GET_PROTO_CAP) as AnatomyPrototypeGetter;
  }
}
