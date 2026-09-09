import {
  isSpecEntityActiveAt,
  isSpecEntityAvailableAt,
  parseSpecBlockTarget,
  specLifecyclePlanSchema,
  specVersionSchema,
  type SpecEntity,
  type SpecLifecyclePlan,
  type SpecRelations,
} from '@proto.ui/spec-schema';
import { filterRelationsForVersion, type SpecWorkspace } from './index';

type SpecLocalizedText = NonNullable<SpecEntity['lifecycleRationale']>;

export type SpecLifecycleBlock = {
  sourceEntityId: string;
  questionId: string;
  target: string;
};

export type SpecLifecycleEvidence = {
  testId: string;
  implementationId: string;
  status: string;
  required: boolean;
  path?: string;
};

export type SpecLifecycleIssue = {
  code: string;
  entityId?: string;
  sliceId?: string;
  message: string;
};

export type SpecLifecycleRow = {
  entityId: string;
  type: SpecEntity['type'];
  status: SpecEntity['status'];
  rationale?: SpecLocalizedText;
  activeSince?: string;
  stableAtVersion: boolean | null;
  activationBlockers: SpecLifecycleBlock[];
  targetedBlocks: SpecLifecycleBlock[];
  unclassifiedBlocks: SpecLifecycleBlock[];
  evidence: SpecLifecycleEvidence[];
  gaps: SpecLifecycleIssue[];
  disposition?: SpecLifecyclePlan['slices'][number];
};

export type SpecLifecycleReport = {
  schemaVersion: 1;
  basis: 'current-catalog';
  currentCatalogDigest?: string;
  version: string;
  scope: 'available-ordinary-entities';
  rows: SpecLifecycleRow[];
  issues: SpecLifecycleIssue[];
  unreviewedEntities: string[];
  summary: {
    entities: number;
    drafts: number;
    reviewedDrafts: number;
    legacyActive: number;
    unclassifiedBlocks: number;
  };
};

function relationIds(relations: SpecRelations, version: string): string[] {
  return Object.values(filterRelationsForVersion(relations, version) ?? {}).flatMap(
    (targets) => targets?.map((target) => target.id) ?? []
  );
}

function hasText(text: SpecLocalizedText | undefined): boolean {
  return (
    text !== undefined &&
    (typeof text === 'string' ? [text] : Object.values(text)).some((value) =>
      Boolean(value?.trim())
    )
  );
}

/** Records catalog facts and authored dispositions; it never changes entity lifecycle. */
export function getSpecLifecycleReport(
  workspace: SpecWorkspace,
  version: string,
  planInput?: unknown
): SpecLifecycleReport {
  specVersionSchema.parse(version);
  const entities = workspace.entities
    .filter((entity) => entity.type !== 'version' && isSpecEntityAvailableAt(entity, version))
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));
  const tests = entities.filter((entity) => entity.type === 'test');
  const plan = planInput === undefined ? undefined : specLifecyclePlanSchema.parse(planInput);
  const issues: SpecLifecycleIssue[] = [];
  if (plan && plan.version !== version) {
    issues.push({
      code: 'plan-version-mismatch',
      message: `Disposition version ${plan.version} does not match ${version}.`,
    });
  }
  const dispositions = new Map<string, SpecLifecyclePlan['slices'][number]>();
  const conflictedEntities = new Set<string>();
  const sliceIds = new Set<string>();
  for (const slice of plan?.slices ?? []) {
    if (sliceIds.has(slice.id))
      issues.push({
        code: 'duplicate-slice',
        sliceId: slice.id,
        message: `Duplicate slice ${slice.id}.`,
      });
    sliceIds.add(slice.id);
    for (const id of slice.entities) {
      if (!entities.some((entity) => entity.id === id)) {
        issues.push({
          code: 'unknown-disposition-entity',
          entityId: id,
          sliceId: slice.id,
          message: `${id} is not an ordinary entity available at ${version}.`,
        });
      }
      if (dispositions.has(id)) {
        conflictedEntities.add(id);
        issues.push({
          code: 'duplicate-disposition',
          entityId: id,
          sliceId: slice.id,
          message: `${id} occurs in more than one disposition entry.`,
        });
      }
      dispositions.set(id, slice);
    }
  }
  for (const id of conflictedEntities) dispositions.delete(id);
  const blocks = entities.flatMap((entity) =>
    entity.openQuestions.flatMap((question) =>
      question.blocks.map((target) => ({
        sourceEntityId: entity.id,
        questionId: question.id,
        target,
        parsed: parseSpecBlockTarget(target),
      }))
    )
  );
  const rows = entities.map((entity): SpecLifecycleRow => {
    const verifyingTests = tests.filter(
      (test) =>
        test.id === entity.id ||
        relationIds(test.verifies, version).includes(entity.id) ||
        relationIds(entity.verifies, version).includes(test.id)
    );
    const evidenceTests = tests.filter(
      (test) =>
        verifyingTests.includes(test) || relationIds(test.exercises, version).includes(entity.id)
    );
    const evidence = evidenceTests
      .flatMap((test) =>
        test.implementations
          .filter(
            (implementation) =>
              test.id === entity.id ||
              implementation.exercises.includes(entity.id) ||
              test.cases.some(
                (testCase) =>
                  implementation.consumesCases.includes(testCase.id) &&
                  entity.criteria.some((criterion) => testCase.covers.includes(criterion.id))
              )
          )
          .map((implementation) => ({
            testId: test.id,
            implementationId: implementation.id,
            status: implementation.status,
            required: implementation.required,
            ...(implementation.path ? { path: implementation.path } : {}),
          }))
      )
      .sort((a, b) =>
        `${a.testId}/${a.implementationId}`.localeCompare(`${b.testId}/${b.implementationId}`)
      );
    const cleanBlock = ({
      sourceEntityId,
      questionId,
      target,
    }: SpecLifecycleBlock): SpecLifecycleBlock => ({ sourceEntityId, questionId, target });
    const activationBlockers = blocks
      .filter((block) => block.parsed?.kind === 'activation' && block.parsed.entityId === entity.id)
      .map(cleanBlock);
    const targetedBlocks = blocks
      .filter(
        (block) =>
          block.parsed && block.parsed.kind !== 'activation' && block.parsed.entityId === entity.id
      )
      .map(cleanBlock);
    const unclassifiedBlocks = blocks
      .filter((block) => !block.parsed && block.sourceEntityId === entity.id)
      .map(cleanBlock);
    const gaps: SpecLifecycleIssue[] = [];
    const gap = (code: string, message: string) =>
      gaps.push({ code, entityId: entity.id, message });
    if (!hasText(entity.lifecycleRationale))
      gap('missing-lifecycle-rationale', 'Lifecycle rationale is not recorded.');
    const legacyActive = entity.status === 'active' && !entity.activeSince;
    if (legacyActive)
      gap(
        'legacy-activation-provenance',
        'Current active status has no recorded activation version; do not infer activeSince from since.'
      );
    if (activationBlockers.length)
      gap('activation-blocked', 'An open question explicitly blocks activation.');
    if (unclassifiedBlocks.length)
      gap(
        'unclassified-block',
        'Legacy block text has no canonical target; its activation impact is unknown.'
      );
    if (entity.type === 'test') {
      if (!entity.cases.length) gap('missing-cases', 'No conformance cases are recorded.');
      if (!entity.implementations.length)
        gap('missing-evidence', 'No executable implementation is recorded.');
      for (const testCase of entity.cases) {
        if (
          !entity.implementations.some(
            (implementation) =>
              implementation.status === 'passing' &&
              implementation.consumesCases.includes(testCase.id)
          )
        ) {
          gap('case-needs-evidence', `${testCase.id} has no implementation declared passing.`);
        }
      }
    } else {
      if (!hasText(entity.statement))
        gap('missing-statement', 'No reviewable statement is recorded.');
      if (!entity.criteria.length) gap('missing-criteria', 'No admission criteria are recorded.');
      if (!['decision', 'knowledge'].includes(entity.type)) {
        for (const criterion of entity.criteria) {
          if (
            !verifyingTests.some((test) =>
              test.cases.some(
                (testCase) =>
                  testCase.covers.includes(criterion.id) &&
                  test.implementations.some(
                    (implementation) =>
                      implementation.status === 'passing' &&
                      implementation.consumesCases.includes(testCase.id)
                  )
              )
            )
          ) {
            gap(
              'criterion-needs-evidence',
              `${criterion.id} has no mapped implementation declared passing.`
            );
          }
        }
      }
    }
    for (const implementation of evidence.filter(
      (item) => item.required && item.status !== 'passing'
    )) {
      gap(
        'required-evidence-incomplete',
        `${implementation.testId}#${implementation.implementationId} is ${implementation.status}.`
      );
    }
    const disposition = plan?.version === version ? dispositions.get(entity.id) : undefined;
    if (disposition?.disposition === 'remain-draft' && entity.status !== 'draft') {
      issues.push({
        code: 'disposition-status-mismatch',
        entityId: entity.id,
        sliceId: disposition.id,
        message: 'remain-draft applies only to a draft entity.',
      });
    }
    if (disposition?.disposition === 'promote') {
      if (entity.status !== 'draft')
        issues.push({
          code: 'disposition-status-mismatch',
          entityId: entity.id,
          sliceId: disposition.id,
          message: 'promote is a review proposal for a draft entity, not a lifecycle mutation.',
        });
      if (gaps.length)
        issues.push({
          code: 'promotion-evidence-incomplete',
          entityId: entity.id,
          sliceId: disposition.id,
          message: 'Promotion proposal retains unresolved catalog gaps.',
        });
    }
    return {
      entityId: entity.id,
      type: entity.type,
      status: entity.status,
      ...(entity.lifecycleRationale ? { rationale: entity.lifecycleRationale } : {}),
      ...(entity.activeSince ? { activeSince: entity.activeSince } : {}),
      stableAtVersion: legacyActive ? null : isSpecEntityActiveAt(entity, version),
      activationBlockers,
      targetedBlocks,
      unclassifiedBlocks,
      evidence,
      gaps,
      ...(disposition ? { disposition } : {}),
    };
  });
  return {
    schemaVersion: 1,
    basis: 'current-catalog',
    version,
    scope: 'available-ordinary-entities',
    rows,
    issues,
    unreviewedEntities: rows
      .filter((row) => row.status === 'draft' && !row.disposition)
      .map((row) => row.entityId),
    summary: {
      entities: rows.length,
      drafts: rows.filter((row) => row.status === 'draft').length,
      reviewedDrafts: rows.filter((row) => row.status === 'draft' && row.disposition).length,
      legacyActive: rows.filter((row) => row.stableAtVersion === null).length,
      unclassifiedBlocks: rows.reduce((sum, row) => sum + row.unclassifiedBlocks.length, 0),
    },
  };
}

/** Completeness of dispositions in an explicit scope is separate from semantic approval. */
export function checkSpecLifecycleDispositions(
  report: SpecLifecycleReport,
  entityIds?: readonly string[]
): SpecLifecycleIssue[] {
  const selected = new Set(entityIds ?? report.rows.map((row) => row.entityId));
  const issues = report.issues.filter(
    (issue) => !entityIds || !issue.entityId || selected.has(issue.entityId)
  );
  for (const id of [...selected].sort()) {
    const row = report.rows.find((candidate) => candidate.entityId === id);
    if (!row)
      issues.push({
        code: 'unknown-scope-entity',
        entityId: id,
        message: `${id} is outside the report scope.`,
      });
    else if (row.status === 'draft' && !row.disposition)
      issues.push({
        code: 'missing-disposition',
        entityId: id,
        message: 'Draft entity has no authored release disposition.',
      });
  }
  return issues;
}

export function checkSpecLifecycleAuthoring(
  before: SpecEntity | undefined,
  after: SpecEntity | undefined
): string[] {
  if (!after)
    return before && before.type !== 'version'
      ? [`${before.id}: retain the entity and record removal through its lifecycle history.`]
      : [];
  if (after.type === 'version') return [];
  const changed =
    !before ||
    before.id !== after.id ||
    ['status', 'since', 'activeSince', 'deprecatedSince', 'removedSince'].some(
      (key) => before[key as keyof SpecEntity] !== after[key as keyof SpecEntity]
    );
  if (!changed) return [];
  const issues: string[] = [];
  if (!hasText(after.lifecycleRationale))
    issues.push(`${after.id}: new or lifecycle-changing authoring requires lifecycleRationale.`);
  else if (
    before &&
    JSON.stringify(before.lifecycleRationale) === JSON.stringify(after.lifecycleRationale)
  )
    issues.push(`${after.id}: changed lifecycle requires updated lifecycleRationale.`);
  if (after.status === 'active' && !after.activeSince)
    issues.push(
      `${after.id}: newly admitted active status requires activation provenance in activeSince.`
    );
  if (before && before.status !== 'active' && after.status === 'active') {
    const previousRevisions = new Set(before.revisions.map((revision) => JSON.stringify(revision)));
    if (
      !after.revisions.some(
        (revision) =>
          revision.version === after.activeSince &&
          hasText(revision.summary) &&
          !previousRevisions.has(JSON.stringify(revision))
      )
    )
      issues.push(
        `${after.id}: promotion requires a new admission revision with a summary at activeSince.`
      );
  }
  return issues;
}
