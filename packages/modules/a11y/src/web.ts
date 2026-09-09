import {
  isA11ySemanticObjectRef,
  type A11yRelationMode,
  type A11ySemanticObjectRef,
  type A11ySemanticObjectSnapshot,
} from '@proto.ui/core';

import type { A11yProjector } from './caps';

const ARIA_STATE_ATTRS: Record<string, string> = {
  atomic: 'aria-atomic',
  busy: 'aria-busy',
  checked: 'aria-checked',
  disabled: 'aria-disabled',
  expanded: 'aria-expanded',
  hasPopup: 'aria-haspopup',
  invalid: 'aria-invalid',
  live: 'aria-live',
  orientation: 'aria-orientation',
  pressed: 'aria-pressed',
  readOnly: 'aria-readonly',
  selected: 'aria-selected',
  modal: 'aria-modal',
};

const ARIA_RELATION_ATTRS: Record<string, string> = {
  controls: 'aria-controls',
  describedBy: 'aria-describedby',
  labelledBy: 'aria-labelledby',
};

type StructuredProjection = {
  target: HTMLElement;
  attr: string;
  mode: A11yRelationMode;
  tokens: readonly string[];
  ownedTokens: readonly string[];
  previousValue: string | null;
  projectedValue: string;
};

type WebProjectorRecord = {
  getTarget: () => HTMLElement | null;
  target: HTMLElement | null;
  targetDocument: Document | null;
  snapshot: A11ySemanticObjectSnapshot | null;
  objectRef: A11ySemanticObjectRef | null;
  reservedId: string | null;
  reservedDocument: Document | null;
  ownedIdTarget: HTMLElement | null;
  lastTargetId: string | null;
  dependencyRefs: Set<A11ySemanticObjectRef>;
  scalarAttributes: Map<HTMLElement, Map<string, string>>;
  legacyAppendAttributes: Map<string, { target: HTMLElement; tokens: readonly string[] }>;
  detached: boolean;
  disposed: boolean;
};

export type WebA11yProjectionRegistry = {
  createProjector(
    getTarget: () => HTMLElement | null,
    subscribeTargetChange?: (listener: () => void) => () => void
  ): A11yProjector;
};

export function createWebA11yProjectionRegistry(
  options: { idPrefix?: string } = {}
): WebA11yProjectionRegistry {
  const idPrefix = options.idPrefix?.trim().replace(/\s+/g, '-') || 'pui-a11y';
  const dependentSourcesByRef = new Map<A11ySemanticObjectRef, Set<WebProjectorRecord>>();
  const recordsByRef = new Map<A11ySemanticObjectRef, Set<WebProjectorRecord>>();
  const reservedIdsByDocument = new Map<Document, Map<string, A11ySemanticObjectRef>>();
  const reservedIdsByRef = new Map<A11ySemanticObjectRef, Map<Document, string>>();
  const appendTokenRefs = new WeakMap<
    HTMLElement,
    Map<string, Map<string, { baseline: boolean; count: number }>>
  >();
  const scalarAttributeRefs = new WeakMap<
    HTMLElement,
    Map<string, Map<string, { count: number; baseline: boolean }>>
  >();

  const acquireAppendTokens = (
    target: HTMLElement,
    attr: string,
    tokens: readonly string[],
    baseline: readonly string[]
  ) => {
    let byAttribute = appendTokenRefs.get(target);
    if (!byAttribute) {
      byAttribute = new Map();
      appendTokenRefs.set(target, byAttribute);
    }
    let byToken = byAttribute.get(attr);
    if (!byToken) {
      byToken = new Map();
      byAttribute.set(attr, byToken);
    }
    const baselineSet = new Set(baseline);
    for (const token of tokens) {
      const entry = byToken.get(token) ?? { baseline: baselineSet.has(token), count: 0 };
      entry.count += 1;
      byToken.set(token, entry);
    }
  };

  const releaseAppendTokens = (target: HTMLElement, attr: string, tokens: readonly string[]) => {
    const byAttribute = appendTokenRefs.get(target);
    const byToken = byAttribute?.get(attr);
    if (!byToken) return;
    const current = readTokens(target.getAttribute(attr));
    const remove = new Set<string>();
    for (const token of tokens) {
      const entry = byToken.get(token);
      if (!entry) continue;
      entry.count -= 1;
      if (entry.count === 0) {
        if (!entry.baseline && current.includes(token)) remove.add(token);
        byToken.delete(token);
      }
    }
    if (remove.size) setTokenListAttr(target, attr, withoutTokens(current, [...remove]));
    if (byToken.size === 0) byAttribute?.delete(attr);
    if (byAttribute?.size === 0) appendTokenRefs.delete(target);
  };
  const appendTokenIsReferenced = (target: HTMLElement, attr: string, token: string) =>
    (appendTokenRefs.get(target)?.get(attr)?.get(token)?.count ?? 0) > 0;

  const releaseScalarAttributes = (record: WebProjectorRecord, removeOwned = true) => {
    if (!removeOwned) return;
    for (const [target, attributes] of record.scalarAttributes) {
      for (const [attr, value] of attributes) {
        const byAttribute = scalarAttributeRefs.get(target);
        const byValue = byAttribute?.get(attr);
        const entry = byValue?.get(value);
        if (!entry) continue;
        entry.count -= 1;
        if (entry.count === 0) {
          byValue?.delete(value);
          if (!entry.baseline && target.getAttribute(attr) === value) target.removeAttribute(attr);
        }
        if (byValue?.size === 0) byAttribute?.delete(attr);
        if (byAttribute?.size === 0) scalarAttributeRefs.delete(target);
      }
    }
    for (const [attr, ownership] of record.legacyAppendAttributes) {
      releaseAppendTokens(ownership.target, attr, ownership.tokens);
    }
    record.legacyAppendAttributes.clear();
    record.scalarAttributes.clear();
  };

  const acquireScalarAttributes = (
    record: WebProjectorRecord,
    target: HTMLElement,
    snapshot: A11ySemanticObjectSnapshot
  ) => {
    for (const [attr, value] of projectedScalarAttributes(snapshot)) {
      let byAttribute = scalarAttributeRefs.get(target);
      if (!byAttribute) {
        byAttribute = new Map();
        scalarAttributeRefs.set(target, byAttribute);
      }
      let byValue = byAttribute.get(attr);
      if (!byValue) {
        byValue = new Map();
        byAttribute.set(attr, byValue);
      }
      const entry = byValue.get(value);
      if (entry) entry.count += 1;
      else byValue.set(value, { count: 1, baseline: target.getAttribute(attr) === value });
      const ownedAttributes = record.scalarAttributes.get(target) ?? new Map<string, string>();
      ownedAttributes.set(attr, value);
      record.scalarAttributes.set(target, ownedAttributes);
    }
    for (const [key, attr] of Object.entries(ARIA_RELATION_ATTRS)) {
      const relation = snapshot.relations[key];
      if (typeof relation !== 'string' || snapshot.relationModes?.[key] !== 'append') continue;
      const tokens = readTokens(relation);
      acquireAppendTokens(target, attr, tokens, readTokens(target.getAttribute(attr)));
      record.legacyAppendAttributes.set(attr, { target, tokens });
    }
  };

  let nextId = 1;

  const unindex = (record: WebProjectorRecord) => {
    if (!record.objectRef) return;
    const indexed = recordsByRef.get(record.objectRef);
    if (!indexed) return;
    indexed.delete(record);
    if (indexed.size === 0) recordsByRef.delete(record.objectRef);
  };

  const releaseOwnedId = (record: WebProjectorRecord) => {
    const target = record.ownedIdTarget;
    if (target && record.reservedId && target.id === record.reservedId)
      target.removeAttribute('id');
    record.ownedIdTarget = null;
  };

  const releaseReservation = (record: WebProjectorRecord) => {
    releaseOwnedId(record);
    const { objectRef, reservedDocument, reservedId } = record;
    if (objectRef && reservedDocument && reservedId) {
      const documentReservations = reservedIdsByDocument.get(reservedDocument);
      if (documentReservations?.get(reservedId) === objectRef) {
        documentReservations.delete(reservedId);
        if (documentReservations.size === 0) reservedIdsByDocument.delete(reservedDocument);
      }
      const refReservations = reservedIdsByRef.get(objectRef);
      if (refReservations?.get(reservedDocument) === reservedId) {
        refReservations.delete(reservedDocument);
        if (refReservations.size === 0) reservedIdsByRef.delete(objectRef);
      }
    }
    record.reservedDocument = null;
    record.reservedId = null;
  };

  const clearProjection = (record: WebProjectorRecord, key: string) => {
    const projection = record.projections.get(key);
    if (!projection) return;
    if (projection.mode === 'append') {
      releaseAppendTokens(projection.target, projection.attr, projection.tokens);
    } else {
      const previous = readTokens(projection.previousValue);
      releaseAppendTokens(projection.target, projection.attr, projection.tokens);
      const current = readTokens(projection.target.getAttribute(projection.attr));
      const remove = projection.tokens.filter(
        (token) =>
          !previous.includes(token) &&
          !appendTokenIsReferenced(projection.target, projection.attr, token)
      );
      const preserved = withoutTokens(current, remove);
      setTokenListAttr(projection.target, projection.attr, [...previous, ...preserved]);
    }
    record.projections.delete(key);
  };

  const clearProjections = (record: WebProjectorRecord) => {
    for (const key of [...record.projections.keys()]) clearProjection(record, key);
  };

  const removeDependencies = (record: WebProjectorRecord) => {
    for (const ref of record.dependencyRefs) {
      const sources = dependentSourcesByRef.get(ref);
      if (!sources) continue;
      sources.delete(record);
      if (sources.size === 0) dependentSourcesByRef.delete(ref);
    }
    record.dependencyRefs.clear();
  };

  const updateDependencies = (record: WebProjectorRecord, snapshot: A11ySemanticObjectSnapshot) => {
    removeDependencies(record);
    for (const key of Object.keys(ARIA_RELATION_ATTRS)) {
      const relation = snapshot.relations[key];
      if (!Array.isArray(relation)) continue;
      for (const ref of relation) {
        if (!isA11ySemanticObjectRef(ref) || record.dependencyRefs.has(ref)) continue;
        record.dependencyRefs.add(ref);
        const sources = dependentSourcesByRef.get(ref) ?? new Set<WebProjectorRecord>();
        sources.add(record);
        dependentSourcesByRef.set(ref, sources);
      }
    }
  };

  const structuredRelationsChanged = (
    previous: A11ySemanticObjectSnapshot | null,
    next: A11ySemanticObjectSnapshot
  ) => {
    for (const key of Object.keys(ARIA_RELATION_ATTRS)) {
      const previousRelation = previous?.relations[key];
      const nextRelation = next.relations[key];
      const previousIsStructured = Array.isArray(previousRelation);
      const nextIsStructured = Array.isArray(nextRelation);
      if (previousIsStructured !== nextIsStructured) return true;
      if (!previousIsStructured || !nextIsStructured) continue;
      if (previousRelation.length !== nextRelation.length) return true;
      if (previousRelation.some((ref, index) => ref !== nextRelation[index])) return true;
      if (
        (previous?.relationModes?.[key] ?? 'replace') !== (next.relationModes?.[key] ?? 'replace')
      ) {
        return true;
      }
    }
    return false;
  };

  const idIsAvailable = (
    document: Document,
    id: string,
    target: HTMLElement,
    objectRef: A11ySemanticObjectRef
  ) => {
    const reservation = reservedIdsByDocument.get(document)?.get(id);
    if (reservation && reservation !== objectRef) return false;
    for (const element of document.querySelectorAll<HTMLElement>('[id]')) {
      if (element.id === id && element !== target) return false;
    }
    return true;
  };

  const reserveId = (record: WebProjectorRecord, id: string) => {
    const { objectRef, target } = record;
    if (!objectRef || !target) return;
    const document = target.ownerDocument;
    const documentReservations = reservedIdsByDocument.get(document) ?? new Map();
    documentReservations.set(id, objectRef);
    reservedIdsByDocument.set(document, documentReservations);
    const refReservations = reservedIdsByRef.get(objectRef) ?? new Map();
    refReservations.set(document, id);
    reservedIdsByRef.set(objectRef, refReservations);
    record.reservedDocument = document;
    record.reservedId = id;
    record.lastTargetId = id;
  };

  const ensureTargetId = (record: WebProjectorRecord): string | null => {
    const { target, objectRef } = record;
    if (!target || !objectRef) return null;
    const document = target.ownerDocument;
    if (record.reservedDocument && record.reservedDocument !== document) {
      releaseReservation(record);
    }
    if (!record.reservedId) {
      const reservedId = reservedIdsByRef.get(objectRef)?.get(document);
      if (reservedId) {
        record.reservedDocument = document;
        record.reservedId = reservedId;
      }
    }

    if (record.reservedId) {
      if (target.id && target.id !== record.reservedId) return null;
      if (!idIsAvailable(document, record.reservedId, target, objectRef)) return null;
      if (!target.id) {
        target.id = record.reservedId;
        record.ownedIdTarget = target;
      }
      record.lastTargetId = record.reservedId;
      return record.reservedId;
    }

    if (target.id) {
      if (!idIsAvailable(document, target.id, target, objectRef)) return null;
      reserveId(record, target.id);
      return target.id;
    }

    let candidate = `${idPrefix}-${nextId++}`;
    while (!idIsAvailable(document, candidate, target, objectRef)) {
      candidate = `${idPrefix}-${nextId++}`;
    }
    target.id = candidate;
    record.ownedIdTarget = target;
    reserveId(record, candidate);
    return candidate;
  };

  const resolveTargets = (
    source: WebProjectorRecord,
    refs: readonly A11ySemanticObjectRef[]
  ): readonly string[] | null => {
    if (!source.target || refs.length === 0) return null;
    const ids: string[] = [];
    const seen = new Set<A11ySemanticObjectRef>();
    for (const ref of refs) {
      if (seen.has(ref)) continue;
      seen.add(ref);
      const candidates = [...(recordsByRef.get(ref) ?? [])].filter(
        (record) => record.target?.ownerDocument === source.target?.ownerDocument
      );
      if (candidates.length !== 1) return null;
      const id = ensureTargetId(candidates[0]!);
      if (!id) return null;
      ids.push(id);
    }
    return ids;
  };

  const applyStructuredProjection = (
    record: WebProjectorRecord,
    key: string,
    attr: string,
    mode: A11yRelationMode,
    tokens: readonly string[] | null
  ) => {
    const current = record.projections.get(key);
    if (
      current &&
      current.target === record.target &&
      current.mode === mode &&
      tokens &&
      current.tokens.length === tokens.length &&
      current.tokens.every((token, index) => token === tokens[index])
    ) {
      return;
    }
    clearProjection(record, key);
    if (!record.target || !tokens || tokens.length === 0) return;

    if (mode === 'append') {
      const previousValue = record.target.getAttribute(attr);
      const baseline = readTokens(previousValue);
      acquireAppendTokens(record.target, attr, tokens, baseline);
      setTokenListAttr(record.target, attr, [...baseline, ...tokens]);
      record.projections.set(key, {
        target: record.target,
        attr,
        mode,
        tokens: [...tokens],
        ownedTokens: [...tokens],
        previousValue,
        projectedValue: [...new Set([...baseline, ...tokens])].join(' '),
      });
      return;
    }

    const previousValue = record.target.getAttribute(attr);
    const projectedValue = tokens.join(' ');
    acquireAppendTokens(record.target, attr, tokens, readTokens(previousValue));
    setOptionalAttr(record.target, attr, projectedValue);
    record.projections.set(key, {
      target: record.target,
      attr,
      mode,
      tokens: [...tokens],
      ownedTokens: [...tokens],
      previousValue,
      projectedValue,
    });
  };

  const reconcileSource = (record: WebProjectorRecord) => {
    const active = new Set<string>();
    if (record.target && record.snapshot) {
      for (const [key, attr] of Object.entries(ARIA_RELATION_ATTRS)) {
        const relation = record.snapshot.relations[key];
        if (!Array.isArray(relation)) continue;
        active.add(key);
        const refs = relation.filter(isA11ySemanticObjectRef);
        const tokens = refs.length === relation.length ? resolveTargets(record, refs) : null;
        applyStructuredProjection(
          record,
          key,
          attr,
          record.snapshot.relationModes?.[key] ?? 'replace',
          tokens
        );
      }
    }
    for (const key of [...record.projections.keys()]) {
      if (!active.has(key)) clearProjection(record, key);
    }
  };

  const reconcileDependents = (
    refs: ReadonlySet<A11ySemanticObjectRef>,
    alreadyReconciled?: WebProjectorRecord
  ) => {
    const affected = new Set<WebProjectorRecord>();
    for (const ref of refs) {
      for (const source of dependentSourcesByRef.get(ref) ?? []) affected.add(source);
    }
    if (alreadyReconciled) affected.delete(alreadyReconciled);
    for (const source of affected) reconcileSource(source);
  };

  const clearPreviousLegacyRelations = (
    target: HTMLElement,
    previous: A11ySemanticObjectSnapshot,
    next: A11ySemanticObjectSnapshot
  ) => {
    for (const [key, attr] of Object.entries(ARIA_RELATION_ATTRS)) {
      if (!Object.prototype.hasOwnProperty.call(previous.relations, key)) continue;
      if (Array.isArray(previous.relations[key])) continue;
      const nextHasLegacyRelation =
        Object.prototype.hasOwnProperty.call(next.relations, key) &&
        !Array.isArray(next.relations[key]);
      if (nextHasLegacyRelation) continue;
      if (previous.relationModes?.[key] === 'append') {
        setTokenListAttr(
          target,
          attr,
          withoutTokens(readTokens(target.getAttribute(attr)), relationTokens(previous, key))
        );
      } else if (target.getAttribute(attr) === previous.relations[key]) {
        target.removeAttribute(attr);
      }
    }
  };

  const update = (
    record: WebProjectorRecord,
    snapshot: A11ySemanticObjectSnapshot,
    forceStructured = false
  ) => {
    if (record.disposed || record.detached) return;
    const nextTarget = record.getTarget();
    const nextDocument = nextTarget?.ownerDocument ?? record.targetDocument;
    const targetChanged = nextTarget !== record.target;
    const documentChanged = nextDocument !== record.targetDocument;
    const refChanged = snapshot.objectRef !== record.objectRef;
    const previousSnapshot = record.snapshot;
    const previousRef = record.objectRef;
    const previousTargetId = record.lastTargetId;
    const bindingReplaced = targetChanged || documentChanged || refChanged;
    const structuredChanged =
      forceStructured || bindingReplaced || structuredRelationsChanged(previousSnapshot, snapshot);

    releaseScalarAttributes(record, !bindingReplaced);
    if (bindingReplaced) {
      clearProjections(record);
      if (record.target && previousSnapshot) clearWebA11ySnapshot(record.target, previousSnapshot);
      unindex(record);
      releaseOwnedId(record);
      if (documentChanged || refChanged) releaseReservation(record);
    } else {
      if (record.target && previousSnapshot) {
        clearPreviousLegacyRelations(record.target, previousSnapshot, snapshot);
      }
      for (const key of [...record.projections.keys()]) {
        if (!Array.isArray(snapshot.relations[key])) clearProjection(record, key);
      }
    }

    record.target = nextTarget;
    record.targetDocument = nextDocument;
    record.snapshot = snapshot;
    record.objectRef = snapshot.objectRef;
    if (structuredChanged) updateDependencies(record, snapshot);
    if (nextTarget) {
      const indexed = recordsByRef.get(snapshot.objectRef) ?? new Set<WebProjectorRecord>();
      indexed.add(record);
      recordsByRef.set(snapshot.objectRef, indexed);
      acquireScalarAttributes(record, nextTarget, snapshot);
      applyWebA11ySnapshot(
        nextTarget,
        snapshot,
        !bindingReplaced ? (previousSnapshot ?? undefined) : undefined
      );
    }

    const currentTargetId = nextTarget?.id || null;
    if (
      !targetChanged &&
      record.reservedId &&
      nextTarget &&
      currentTargetId !== previousTargetId &&
      currentTargetId !== record.reservedId
    ) {
      // Release only after a live id transition within the same binding.
      releaseReservation(record);
    }
    const bindingChanged = bindingReplaced || currentTargetId !== previousTargetId;
    record.lastTargetId = currentTargetId;
    if (structuredChanged) reconcileSource(record);
    if (bindingChanged) {
      const affectedRefs = new Set<A11ySemanticObjectRef>();
      if (previousRef) affectedRefs.add(previousRef);
      affectedRefs.add(snapshot.objectRef);
      reconcileDependents(affectedRefs, structuredChanged ? record : undefined);
    }
  };

  return {
    createProjector(getTarget, subscribeTargetChange) {
      const record: WebProjectorRecord = {
        getTarget,
        target: null,
        targetDocument: null,
        snapshot: null,
        objectRef: null,
        reservedId: null,
        reservedDocument: null,
        ownedIdTarget: null,
        lastTargetId: null,
        scalarAttributes: new Map(),
        legacyAppendAttributes: new Map(),
        dependencyRefs: new Set(),
        projections: new Map(),
        detached: false,
        disposed: false,
      };
      let unsubscribe = subscribeTargetChange?.(() => {
        if (record.snapshot) update(record, record.snapshot);
      });
      const detach = (removeOwned = false) => {
        if (record.disposed || record.detached) return;
        const affectedRef = record.objectRef;
        releaseScalarAttributes(record, removeOwned);
        record.detached = true;
        unsubscribe?.();
        unsubscribe = undefined;
        clearProjections(record);
        removeDependencies(record);
        unindex(record);
        releaseOwnedId(record);
        if (affectedRef) reconcileDependents(new Set([affectedRef]));
      };
      const projector: A11yProjector = (snapshot) => update(record, snapshot);
      projector.detach = detach;
      projector.reactivate = () => {
        if (record.disposed) return;
        record.detached = false;
        if (!unsubscribe) {
          unsubscribe = subscribeTargetChange?.(() => {
            if (record.snapshot) update(record, record.snapshot);
          });
        }
        if (record.snapshot) update(record, record.snapshot, true);
      };
      projector.clearHeadingLevel = () => {
        if (record.snapshot && hasProjectedHeadingLevel(record.snapshot)) {
          record.target?.removeAttribute('aria-level');
        }
      };
      projector.dispose = () => {
        if (record.disposed) return;
        if (record.detached) releaseScalarAttributes(record, true);
        else detach(true);
        record.disposed = true;
        releaseReservation(record);
        record.snapshot = null;
        record.target = null;
        record.targetDocument = null;
        record.lastTargetId = null;
        record.objectRef = null;
      };
      return projector;
    },
  };
}

const DEFAULT_WEB_A11Y_PROJECTION_REGISTRY = createWebA11yProjectionRegistry();

export function createWebA11yProjector(
  target: HTMLElement | (() => HTMLElement | null),
  subscribeTargetChange?: (listener: () => void) => () => void,
  registry: WebA11yProjectionRegistry = DEFAULT_WEB_A11Y_PROJECTION_REGISTRY
): A11yProjector {
  const getTarget = typeof target === 'function' ? target : () => target;
  return registry.createProjector(getTarget, subscribeTargetChange);
}

function hasProjectedHeadingLevel(snapshot: A11ySemanticObjectSnapshot): boolean {
  const level = snapshot.level;
  return (
    snapshot.role === 'heading' &&
    typeof level === 'number' &&
    Number.isInteger(level) &&
    level >= 1 &&
    level <= 6
  );
}
function projectedScalarAttributes(snapshot: A11ySemanticObjectSnapshot): Map<string, string> {
  const attrs = new Map<string, string>();
  if (typeof snapshot.id === 'string') attrs.set('id', snapshot.id);
  if (typeof snapshot.role === 'string') attrs.set('role', snapshot.role);
  if (hasProjectedHeadingLevel(snapshot)) attrs.set('aria-level', String(snapshot.level));
  if (snapshot.name?.kind === 'text') {
    const value = readTextTarget(snapshot.name.value);
    if (value !== undefined) attrs.set('aria-label', value);
  }
  if (snapshot.description?.kind === 'text') {
    const value = readTextTarget(snapshot.description.value);
    if (value !== undefined) attrs.set('aria-description', value);
  }
  for (const [key, attr] of Object.entries(ARIA_STATE_ATTRS)) {
    if (Object.prototype.hasOwnProperty.call(snapshot.states, key)) {
      const value = projectedAttributeValue(snapshot.states[key]);
      if (value !== undefined) attrs.set(attr, value);
    }
  }
  if (Object.prototype.hasOwnProperty.call(snapshot.states, 'hidden')) {
    const value = projectedAttributeValue(snapshot.states.hidden);
    if (value !== undefined) attrs.set('aria-hidden', value);
  }
  for (const [key, attr] of Object.entries(ARIA_RELATION_ATTRS)) {
    const relation = snapshot.relations[key];
    if (typeof relation === 'string' && snapshot.relationModes?.[key] !== 'append') {
      attrs.set(attr, relation);
    }
  }
  if (Object.keys(snapshot.actions).length) {
    attrs.set('data-pui-a11y-actions', Object.keys(snapshot.actions).sort().join(' '));
  }
  if (snapshot.tree) {
    if (Object.prototype.hasOwnProperty.call(snapshot.tree, 'hidden')) {
      const value = projectedAttributeValue(snapshot.tree.hidden);
      if (value !== undefined) attrs.set('aria-hidden', value);
    }
    if (Object.prototype.hasOwnProperty.call(snapshot.tree, 'mergeChildren')) {
      const value = projectedAttributeValue(snapshot.tree.mergeChildren);
      if (value !== undefined) attrs.set('data-pui-a11y-merge-children', value);
    }
  }
  return attrs;
}

export function clearWebA11ySnapshot(el: HTMLElement, snapshot: A11ySemanticObjectSnapshot): void {
  if (typeof snapshot.id !== 'undefined') el.removeAttribute('id');
  if (typeof snapshot.role !== 'undefined') el.removeAttribute('role');
  if (hasProjectedHeadingLevel(snapshot)) el.removeAttribute('aria-level');
  if (snapshot.name) el.removeAttribute('aria-label');
  if (snapshot.description) el.removeAttribute('aria-description');

  for (const [key, attr] of Object.entries(ARIA_STATE_ATTRS)) {
    if (Object.prototype.hasOwnProperty.call(snapshot.states, key)) el.removeAttribute(attr);
  }
  if (Object.prototype.hasOwnProperty.call(snapshot.states, 'hidden')) {
    el.removeAttribute('aria-hidden');
    el.removeAttribute('hidden');
  }
  for (const [key, attr] of Object.entries(ARIA_RELATION_ATTRS)) {
    if (!Object.prototype.hasOwnProperty.call(snapshot.relations, key)) continue;
    if (Array.isArray(snapshot.relations[key])) continue;
    if (snapshot.relationModes?.[key] === 'append') {
      setTokenListAttr(
        el,
        attr,
        withoutTokens(readTokens(el.getAttribute(attr)), relationTokens(snapshot, key))
      );
    } else {
      el.removeAttribute(attr);
    }
  }
  if (Object.keys(snapshot.actions).length) el.removeAttribute('data-pui-a11y-actions');
  if (snapshot.tree) {
    if (Object.prototype.hasOwnProperty.call(snapshot.tree, 'hidden')) {
      el.removeAttribute('aria-hidden');
    }
    if (Object.prototype.hasOwnProperty.call(snapshot.tree, 'mergeChildren')) {
      el.removeAttribute('data-pui-a11y-merge-children');
    }
  }
}

function projectedAttributeValue(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  return typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value);
}

export function applyWebA11ySnapshot(
  el: HTMLElement,
  snapshot: A11ySemanticObjectSnapshot,
  previousSnapshot?: A11ySemanticObjectSnapshot
): void {
  if (typeof snapshot.id !== 'undefined') {
    setOptionalAttr(el, 'id', snapshot.id ?? undefined);
  }

  const level = snapshot.level;
  if (typeof snapshot.role !== 'undefined') {
    setOptionalAttr(el, 'role', snapshot.role);
  }
  if (
    snapshot.role === 'heading' &&
    typeof level === 'number' &&
    Number.isInteger(level) &&
    level >= 1 &&
    level <= 6
  ) {
    setOptionalAttr(el, 'aria-level', String(level));
  } else if (hasProjectedHeadingLevel(previousSnapshot ?? ({} as A11ySemanticObjectSnapshot))) {
    el.removeAttribute('aria-level');
  }

  if (snapshot.name) {
    if (snapshot.name.kind === 'text') {
      setOptionalAttr(el, 'aria-label', readTextTarget(snapshot.name.value));
    } else {
      el.removeAttribute('aria-label');
    }
  }

  if (snapshot.description) {
    if (snapshot.description.kind === 'text') {
      setOptionalAttr(el, 'aria-description', readTextTarget(snapshot.description.value));
    } else {
      el.removeAttribute('aria-description');
    }
  }

  for (const [key, attr] of Object.entries(ARIA_STATE_ATTRS)) {
    if (Object.prototype.hasOwnProperty.call(snapshot.states, key)) {
      setA11yStateAttr(el, attr, snapshot.states[key]);
    }
  }

  if (Object.prototype.hasOwnProperty.call(snapshot.states, 'hidden')) {
    setA11yStateAttr(el, 'aria-hidden', snapshot.states.hidden);
    setBooleanPresenceAttr(el, 'hidden', snapshot.states.hidden);
  }

  for (const [key, attr] of Object.entries(ARIA_RELATION_ATTRS)) {
    if (Object.prototype.hasOwnProperty.call(snapshot.relations, key)) {
      if (Array.isArray(snapshot.relations[key])) continue;
      if (snapshot.relationModes?.[key] === 'append') {
        const current = readTokens(el.getAttribute(attr));
        const previousOwned =
          previousSnapshot?.relationModes?.[key] === 'append'
            ? relationTokens(previousSnapshot, key)
            : [];
        setTokenListAttr(el, attr, [
          ...withoutTokens(current, previousOwned),
          ...relationTokens(snapshot, key),
        ]);
      } else {
        const relation = snapshot.relations[key];
        setOptionalAttr(el, attr, typeof relation === 'string' ? relation : undefined);
      }
    }
  }

  const actionKeys = Object.keys(snapshot.actions).sort();
  if (actionKeys.length) {
    setOptionalAttr(el, 'data-pui-a11y-actions', actionKeys.join(' '));
  }

  if (snapshot.tree) {
    if (Object.prototype.hasOwnProperty.call(snapshot.tree, 'hidden')) {
      setA11yStateAttr(el, 'aria-hidden', snapshot.tree.hidden);
    }
    if (Object.prototype.hasOwnProperty.call(snapshot.tree, 'mergeChildren')) {
      setA11yStateAttr(el, 'data-pui-a11y-merge-children', snapshot.tree.mergeChildren);
    }
  }
}

function relationTokens(snapshot: A11ySemanticObjectSnapshot, key: string): string[] {
  return readTokens(snapshot.relations[key]);
}

function readTokens(value: unknown): string[] {
  if (typeof value !== 'string') return [];
  return [...new Set(value.trim().split(/\s+/).filter(Boolean))];
}

function withoutTokens(current: string[], removed: string[]): string[] {
  const removal = new Set(removed);
  return current.filter((token) => !removal.has(token));
}

function setTokenListAttr(el: HTMLElement, attr: string, tokens: string[]): void {
  setOptionalAttr(el, attr, [...new Set(tokens)].join(' '));
}

function setOptionalAttr(el: HTMLElement, attr: string, value: string | undefined): void {
  if (value === undefined || value === '') {
    el.removeAttribute(attr);
    return;
  }
  el.setAttribute(attr, value);
}

function readTextTarget(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  if (
    value &&
    typeof value === 'object' &&
    typeof (value as { get?: unknown }).get === 'function'
  ) {
    const next = (value as { get(): unknown }).get();
    return typeof next === 'string' ? next : undefined;
  }
  return undefined;
}

function setA11yStateAttr(el: HTMLElement, attr: string, value: unknown): void {
  if (value === undefined || value === null || value === '') {
    el.removeAttribute(attr);
    return;
  }
  if (typeof value === 'boolean') {
    el.setAttribute(attr, value ? 'true' : 'false');
    return;
  }
  el.setAttribute(attr, String(value));
}

function setBooleanPresenceAttr(el: HTMLElement, attr: string, value: unknown): void {
  if (value === true) {
    el.setAttribute(attr, '');
    return;
  }
  el.removeAttribute(attr);
}
