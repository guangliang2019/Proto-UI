import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  parseSpecBlockTarget,
  validateSpecEntity,
  type SpecEntity,
  type SpecLifecyclePlan,
} from '@proto.ui/spec-schema';
import {
  checkSpecLifecycleAuthoring,
  checkSpecLifecycleDispositions,
  createSpecWorkspace,
  getSpecLifecycleReport,
} from '@proto.ui/spec-engine';
import {
  loadSpecLifecycleReport,
  loadSpecWorkspaceFromDirectory,
} from '@proto.ui/spec-engine/node';

const version = '0.2.0';
const contractId = 'C-LIFECYCLE-TEST-0001';
const testId = 'T-LIFECYCLE-TEST-0001';
const criterionId = `${contractId}-A`;
const caseId = `${testId}-CASE-ONE`;

function contract(extra: Record<string, unknown> = {}): SpecEntity {
  return validateSpecEntity({
    id: contractId,
    type: 'contract',
    title: 'Lifecycle test contract',
    status: 'draft',
    since: version,
    lifecycleRationale: 'Conformance remains incomplete.',
    statement: 'One governed requirement.',
    criteria: [{ id: criterionId, text: 'The requirement is verified.' }],
    ...extra,
  });
}

function testEntity(status = 'planned'): SpecEntity {
  return validateSpecEntity({
    id: testId,
    type: 'test',
    title: 'Lifecycle conformance',
    status: 'draft',
    since: version,
    lifecycleRationale: 'Executable evidence remains incomplete.',
    cases: [
      { id: caseId, title: 'Requirement', covers: [criterionId], expectation: 'governed-result' },
    ],
    implementations: [
      { id: 'runtime', kind: 'runtime-test', status, required: true, consumesCases: [caseId] },
    ],
    verifies: { contracts: [contractId] },
  });
}

function plan(
  entities = [contractId, testId],
  disposition: SpecLifecyclePlan['slices'][number]['disposition'] = 'remain-draft'
): SpecLifecyclePlan {
  return {
    schemaVersion: 1,
    version,
    slices: [
      {
        id: 'test-slice',
        entities,
        disposition,
        rationale: 'Retain draft until conformance is complete.',
        evidence: ['evidence.txt'],
      },
    ],
  };
}

async function withCatalog(entities: SpecEntity[], run: (root: string) => Promise<void>) {
  const root = await mkdtemp(path.join(tmpdir(), 'proto-lifecycle-'));
  try {
    await mkdir(path.join(root, 'spec'));
    for (const entity of entities)
      await writeFile(path.join(root, 'spec', `${entity.id}.yaml`), JSON.stringify(entity));
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

describe('ordinary lifecycle targets and authoring', () => {
  it('parses only the canonical namespace and preserves free-form legacy text', () => {
    expect(parseSpecBlockTarget(`activation:${contractId}`)).toEqual({
      kind: 'activation',
      entityId: contractId,
    });
    expect(parseSpecBlockTarget(`criterion:${contractId}#${criterionId}`)).toEqual({
      kind: 'criterion',
      entityId: contractId,
      targetId: criterionId,
    });
    expect(parseSpecBlockTarget(`implementation:${testId}#runtime`)).toEqual({
      kind: 'implementation',
      entityId: testId,
      targetId: 'runtime',
    });
    for (const legacy of ['stable release', contractId, 'activation', 'new semantic boundary'])
      expect(parseSpecBlockTarget(legacy)).toBeNull();
  });

  it.each([
    `activation:${contractId}#extra`,
    'activation:unknown',
    `criterion:${contractId}`,
    `implementation:${testId}#runtime#extra`,
  ])('rejects malformed canonical target %s', async (target) => {
    expect(() =>
      contract({
        openQuestions: [{ id: `${contractId}-Q-ONE`, question: 'What remains?', blocks: [target] }],
      })
    ).toThrow(/Invalid canonical block target/);
  });

  it.each([
    ['activation:C-ABSENT-0001', 'Unknown block target entity'],
    [`criterion:${contractId}#missing`, 'Unknown criterion'],
    [`implementation:${testId}#missing`, 'Unknown test implementation'],
    [`implementation:${contractId}#runtime`, 'Unknown test implementation'],
  ])('validates actual target ownership for %s', async (target, message) => {
    await withCatalog(
      [
        contract({
          openQuestions: [
            { id: `${contractId}-Q-ONE`, question: 'What remains?', blocks: [target] },
          ],
        }),
        testEntity(),
      ],
      async (root) => {
        const loaded = await loadSpecWorkspaceFromDirectory(path.join(root, 'spec'));
        expect(loaded.issues.map((issue) => issue.message)).toContainEqual(
          expect.stringContaining(message)
        );
      }
    );
  });

  it('rejects activation with an unresolved incoming blocker', async () => {
    const source = testEntity();
    source.openQuestions = [
      {
        id: `${testId}-Q-ONE`,
        question: 'Is the contract ready?',
        blocks: [`activation:${contractId}`],
      },
    ];
    await withCatalog(
      [contract({ status: 'active', activeSince: version }), source],
      async (root) => {
        expect(
          (await loadSpecWorkspaceFromDirectory(path.join(root, 'spec'))).issues.map(
            (issue) => issue.message
          )
        ).toContainEqual(expect.stringContaining('retains an activation-blocking question'));
      }
    );
  });

  it('does not route ordinary activation blockers into Version publication', async () => {
    const release = validateSpecEntity({
      id: 'V-TEST-0001',
      type: 'version',
      title: 'Release',
      status: 'draft',
      since: version,
      release: {
        version,
        channel: 'stable',
        gitTag: 'v0.2.0',
        npmDistTag: 'latest',
        packageVersionPolicy: 'exact',
        packageScope: 'public-@proto.ui',
      },
    });
    await withCatalog(
      [
        contract({
          openQuestions: [
            { id: `${contractId}-Q-ONE`, question: 'Release?', blocks: ['activation:V-TEST-0001'] },
          ],
        }),
        release,
      ],
      async (root) => {
        expect(
          (await loadSpecWorkspaceFromDirectory(path.join(root, 'spec'))).issues.map(
            (issue) => issue.message
          )
        ).toContainEqual(expect.stringContaining('Version entities retain'));
      }
    );
  });

  it('requires rationale for new and changed lifecycle authoring without rewriting legacy entities', () => {
    const legacy = contract({ status: 'active', lifecycleRationale: undefined });
    expect(checkSpecLifecycleAuthoring(legacy, { ...legacy, title: 'Edited prose' })).toEqual([]);
    expect(checkSpecLifecycleAuthoring(undefined, legacy)).toHaveLength(2);
    expect(checkSpecLifecycleAuthoring(contract(), legacy)).toHaveLength(3);
    expect(
      checkSpecLifecycleAuthoring(legacy, {
        ...legacy,
        activeSince: version,
        lifecycleRationale: 'Reviewed at the recorded version.',
      })
    ).toEqual([]);
    const draft = contract({ lifecycleRationale: undefined });
    expect(checkSpecLifecycleAuthoring(draft, { ...draft, since: '0.1.0' })).toContainEqual(
      expect.stringContaining('requires lifecycleRationale')
    );
    expect(() => contract({ lifecycleRationale: '   ' })).toThrow(/non-whitespace/);
    expect(() => contract({ lifecycleRationale: {} })).toThrow(/non-whitespace/);
  });

  it('requires fresh rationale and a new admission revision for an existing promotion', () => {
    const draft = contract({
      revisions: [{ version, change: 'clarified', summary: 'The draft boundary was clarified.' }],
    });
    const active = { ...draft, status: 'active' as const, activeSince: version };
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('updated lifecycleRationale')
    );
    active.lifecycleRationale = 'Reviewed conformance now supports admission.';
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('new admission revision')
    );
    active.revisions = [...draft.revisions, ...draft.revisions];
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('new admission revision')
    );
    active.revisions = [
      ...draft.revisions,
      { version, change: 'admitted', summary: 'Required conformance was reviewed and accepted.' },
    ];
    expect(checkSpecLifecycleAuthoring(draft, active)).toEqual([]);
    expect(checkSpecLifecycleAuthoring(undefined, { ...active, revisions: [] })).toEqual([]);
  });

  it('preserves ordinary identities instead of silently deleting their history', () => {
    expect(checkSpecLifecycleAuthoring(contract(), undefined)).toContainEqual(
      expect.stringContaining('retain the entity')
    );
    expect(checkSpecLifecycleAuthoring(undefined, undefined)).toEqual([]);
  });

  it('requires appending admission evidence without replacing earlier revisions', () => {
    const draft = contract({
      revisions: [{ version, change: 'clarified', summary: 'The draft boundary was clarified.' }],
    });
    const admission = {
      version,
      change: 'admitted',
      summary: 'Required conformance was accepted.',
    };
    const active: SpecEntity = {
      ...draft,
      status: 'active' as const,
      activeSince: version,
      lifecycleRationale: 'The completed evidence supports admission.',
      revisions: [admission],
    };
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('new admission revision')
    );
    active.revisions = [{ ...draft.revisions[0], summary: admission.summary }];
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('new admission revision')
    );
    active.revisions = [...draft.revisions, admission];
    expect(checkSpecLifecycleAuthoring(draft, active)).toEqual([]);
  });

  it('compares localized rationale content independently of language key order', () => {
    const draft = contract({
      lifecycleRationale: { en: 'Evidence remains open.', 'zh-CN': '证据尚未完成。' },
    });
    const active = {
      ...draft,
      status: 'active' as const,
      activeSince: version,
      lifecycleRationale: { 'zh-CN': '证据尚未完成。', en: 'Evidence remains open.' },
      revisions: [{ version, change: 'admitted', summary: 'Required conformance was accepted.' }],
    };
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('updated lifecycleRationale')
    );
    active.lifecycleRationale = {
      en: 'Required evidence is complete.',
      'zh-CN': '必需证据已完成。',
    };
    expect(checkSpecLifecycleAuthoring(draft, active)).toEqual([]);
  });
});

describe('ordinary lifecycle reporting', () => {
  it('keeps canonical blockers separate from unclassified legacy strings', () => {
    const c = contract({
      openQuestions: [
        {
          id: `${contractId}-Q-ONE`,
          question: 'What evidence remains?',
          blocks: [
            `activation:${contractId}`,
            `activation:${testId}`,
            `implementation:${testId}#runtime`,
            'later API work',
          ],
        },
      ],
    });
    const report = getSpecLifecycleReport(createSpecWorkspace([c, testEntity()]), version, plan());
    expect(report.rows[0].activationBlockers).toHaveLength(1);
    expect(report.rows[0].unclassifiedBlocks[0].target).toBe('later API work');
    expect(report.rows[1].activationBlockers[0].sourceEntityId).toBe(contractId);
    expect(report.rows[1].targetedBlocks).toHaveLength(1);
    expect(report.rows[1].gaps).toContainEqual(
      expect.objectContaining({ code: 'required-evidence-incomplete' })
    );
    expect(checkSpecLifecycleDispositions(report)).toEqual([]);
    expect(report.rows.every((row) => row.status === 'draft')).toBe(true);
  });

  it('reports partial disposition coverage without counting the rest as reviewed', () => {
    const report = getSpecLifecycleReport(
      createSpecWorkspace([contract(), testEntity()]),
      version,
      plan([contractId])
    );
    expect(report.unreviewedEntities).toEqual([testId]);
    expect(checkSpecLifecycleDispositions(report, [contractId])).toEqual([]);
    expect(checkSpecLifecycleDispositions(report)).toContainEqual(
      expect.objectContaining({ code: 'missing-disposition', entityId: testId })
    );
    expect(checkSpecLifecycleDispositions(report, ['C-ABSENT-0001'])).toContainEqual(
      expect.objectContaining({ code: 'unknown-scope-entity' })
    );
  });

  it('isolates scoped disposition checks while retaining global plan errors', () => {
    const dispositions = plan([contractId]);
    dispositions.slices.push({
      ...plan([testId], 'promote').slices[0],
      id: 'incomplete-test',
    });
    const workspace = createSpecWorkspace([contract(), testEntity()]);
    const report = getSpecLifecycleReport(workspace, version, dispositions);
    expect(report.issues).toContainEqual(
      expect.objectContaining({ code: 'promotion-evidence-incomplete', entityId: testId })
    );
    expect(checkSpecLifecycleDispositions(report, [contractId])).toEqual([]);
    expect(checkSpecLifecycleDispositions(report, [testId])).toHaveLength(1);
    const wrongVersion = getSpecLifecycleReport(workspace, version, {
      ...dispositions,
      version: '0.3.0',
    });
    expect(checkSpecLifecycleDispositions(wrongVersion, [contractId])).toContainEqual(
      expect.objectContaining({ code: 'plan-version-mismatch' })
    );
  });

  it('withholds conflicting dispositions instead of selecting the last authored slice', () => {
    const dispositions = plan([contractId]);
    dispositions.slices.push({
      ...dispositions.slices[0],
      id: 'conflicting-slice',
      disposition: 'not-applicable',
    });
    const report = getSpecLifecycleReport(createSpecWorkspace([contract()]), version, dispositions);
    expect(report.issues).toContainEqual(
      expect.objectContaining({ code: 'duplicate-disposition', entityId: contractId })
    );
    expect(report.rows[0].disposition).toBeUndefined();
    expect(report.summary.reviewedDrafts).toBe(0);
    expect(report.unreviewedEntities).toEqual([contractId]);
  });

  it('rejects inconsistent disposition identities, versions, and promotion evidence', () => {
    const workspace = createSpecWorkspace([contract(), testEntity()]);
    const wrongVersion = getSpecLifecycleReport(workspace, version, {
      ...plan(),
      version: '0.3.0',
    });
    expect(wrongVersion.issues[0].code).toBe('plan-version-mismatch');
    expect(wrongVersion.summary.reviewedDrafts).toBe(0);
    const duplicate = plan();
    duplicate.slices.push({ ...duplicate.slices[0] });
    expect(
      getSpecLifecycleReport(workspace, version, duplicate).issues.map((issue) => issue.code)
    ).toContain('duplicate-disposition');
    expect(
      getSpecLifecycleReport(workspace, version, duplicate).rows.every(
        (row) => row.disposition === undefined
      )
    ).toBe(true);
    expect(getSpecLifecycleReport(workspace, version, duplicate).summary.reviewedDrafts).toBe(0);
    expect(getSpecLifecycleReport(workspace, version, plan(['C-ABSENT-0001'])).issues[0].code).toBe(
      'unknown-disposition-entity'
    );
    expect(
      getSpecLifecycleReport(workspace, version, plan(undefined, 'promote')).issues.map(
        (issue) => issue.code
      )
    ).toContain('promotion-evidence-incomplete');
  });

  it('treats recorded passing evidence as a review input, never a lifecycle mutation', () => {
    const workspace = createSpecWorkspace([contract(), testEntity('passing')]);
    const before = JSON.stringify(workspace);
    const report = getSpecLifecycleReport(workspace, version, plan([contractId], 'promote'));
    expect(checkSpecLifecycleDispositions(report, [contractId])).toEqual([]);
    expect(report.rows[0].status).toBe('draft');
    expect(report.rows[0].stableAtVersion).toBe(false);
    expect(JSON.stringify(workspace)).toBe(before);
    expect(
      getSpecLifecycleReport(
        { entities: [...workspace.entities].reverse() },
        version,
        plan([contractId], 'promote')
      )
    ).toEqual(report);
  });

  it('preserves unknown legacy activation provenance and historical boundaries', () => {
    const legacy = getSpecLifecycleReport(
      createSpecWorkspace([contract({ status: 'active', lifecycleRationale: undefined })]),
      version
    );
    expect(legacy.summary.legacyActive).toBe(1);
    expect(legacy.rows[0].stableAtVersion).toBeNull();
    expect(legacy.rows[0].activeSince).toBeUndefined();
    expect(legacy.rows[0].gaps).toContainEqual(
      expect.objectContaining({ code: 'legacy-activation-provenance' })
    );
    expect(checkSpecLifecycleDispositions(legacy)).toEqual([]);
    const future = createSpecWorkspace([contract({ status: 'active', activeSince: '0.3.0' })]);
    const historicalDraft = getSpecLifecycleReport(future, version);
    expect(historicalDraft.rows[0].stableAtVersion).toBe(false);
    expect(historicalDraft.rows[0].draftAtVersion).toBe(true);
    expect(historicalDraft.summary.drafts).toBe(1);
    expect(historicalDraft.unreviewedEntities).toEqual([contractId]);
    expect(checkSpecLifecycleDispositions(historicalDraft, [contractId])).toContainEqual(
      expect.objectContaining({ code: 'missing-disposition' })
    );
    expect(checkSpecLifecycleDispositions(historicalDraft)).toHaveLength(1);
    expect(
      checkSpecLifecycleDispositions(getSpecLifecycleReport(future, version, plan([contractId])))
    ).toEqual([]);
    const admitted = getSpecLifecycleReport(future, '0.3.0');
    expect(admitted.rows[0].stableAtVersion).toBe(true);
    expect(admitted.rows[0].draftAtVersion).toBe(false);
    expect(checkSpecLifecycleDispositions(admitted)).toEqual([]);
    const deprecated = getSpecLifecycleReport(
      createSpecWorkspace([
        contract({
          status: 'deprecated',
          since: '0.1.0',
          activeSince: '0.1.0',
          deprecatedSince: version,
        }),
      ]),
      version
    );
    expect(deprecated.rows[0].stableAtVersion).toBe(false);
    expect(deprecated.rows[0].draftAtVersion).toBe(false);
    expect(checkSpecLifecycleDispositions(deprecated)).toEqual([]);
  });

  it('attributes shared test implementations only to the entities they cover or exercise', () => {
    const secondId = 'C-LIFECYCLE-TEST-0002';
    const secondCriterion = `${secondId}-A`;
    const secondCase = `${testId}-CASE-TWO`;
    const second = contract({
      id: secondId,
      criteria: [{ id: secondCriterion, text: 'The second requirement is verified.' }],
    });
    const test = testEntity('passing');
    test.verifies = { contracts: [{ id: contractId }, { id: secondId }] };
    test.cases.push({
      id: secondCase,
      title: 'Second requirement',
      covers: [secondCriterion],
      expectation: 'second-result',
      notes: [],
    });
    test.implementations.push({
      ...test.implementations[0],
      id: 'second-runtime',
      status: 'planned',
      consumesCases: [secondCase],
    });
    const workspace = createSpecWorkspace([contract(), second, test]);
    const report = getSpecLifecycleReport(workspace, version, plan([contractId], 'promote'));
    const firstRow = report.rows.find((row) => row.entityId === contractId)!;
    expect(firstRow.evidence.map((item) => item.implementationId)).toEqual(['runtime']);
    expect(firstRow.gaps).toEqual([]);
    expect(checkSpecLifecycleDispositions(report, [contractId])).toEqual([]);
    expect(report.rows.find((row) => row.entityId === secondId)?.evidence).toEqual([
      expect.objectContaining({ implementationId: 'second-runtime', status: 'planned' }),
    ]);
    expect(report.rows.find((row) => row.entityId === testId)?.evidence).toHaveLength(2);

    test.implementations[1].exercises = [contractId];
    const exercised = getSpecLifecycleReport(workspace, version, plan([contractId], 'promote'));
    expect(exercised.rows.find((row) => row.entityId === contractId)?.gaps).toContainEqual(
      expect.objectContaining({ code: 'required-evidence-incomplete' })
    );
  });

  it.each(['test-verifies', 'entity-verifies', 'test-exercises'])(
    'uses %s evidence only within its relation version range',
    (direction) => {
      const entity = contract({ since: '0.1.0' });
      const test = testEntity('passing');
      test.since = '0.1.0';
      test.verifies = undefined;
      const range = { since: '0.2.0', until: '0.3.0' };
      if (direction === 'test-verifies')
        test.verifies = { contracts: [{ id: contractId, ...range }] };
      else if (direction === 'entity-verifies')
        entity.verifies = { tests: [{ id: testId, ...range }] };
      else test.exercises = { contracts: [{ id: contractId, ...range }] };
      const workspace = createSpecWorkspace([entity, test]);
      const rowAt = (selectedVersion: string) =>
        getSpecLifecycleReport(workspace, selectedVersion).rows.find(
          (row) => row.entityId === contractId
        )!;
      expect(rowAt('0.1.0').evidence).toEqual([]);
      expect(rowAt('0.2.0').evidence).toHaveLength(1);
      expect(rowAt('0.3.0').evidence).toEqual([]);
      for (const selectedVersion of ['0.1.0', '0.3.0'])
        expect(rowAt(selectedVersion).gaps).toContainEqual(
          expect.objectContaining({ code: 'criterion-needs-evidence' })
        );
      if (direction !== 'test-exercises') expect(rowAt('0.2.0').gaps).toEqual([]);
    }
  );

  it('does not turn a bounded implementation follow-up into an activation block', () => {
    const test = testEntity('passing');
    test.implementations.push({
      id: 'optional-host',
      kind: 'adapter-test',
      status: 'planned',
      required: false,
      consumesCases: [caseId],
      exercises: [],
      notes: [],
    });
    test.openQuestions = [
      {
        id: `${testId}-Q-OPTIONAL`,
        question: 'When should the optional host be covered?',
        blocks: [`implementation:${testId}#optional-host`],
      },
    ];
    const report = getSpecLifecycleReport(
      createSpecWorkspace([contract(), test]),
      version,
      plan([testId], 'promote')
    );
    const row = report.rows.find((entry) => entry.entityId === testId)!;
    expect(row.targetedBlocks).toHaveLength(1);
    expect(row.activationBlockers).toEqual([]);
    expect(checkSpecLifecycleDispositions(report, [testId])).toEqual([]);
    expect(row.status).toBe('draft');
  });

  it('uses type-specific evidence instead of fabricating runtime tests for knowledge', () => {
    const knowledge = validateSpecEntity({
      id: 'K-TEST-0001',
      type: 'knowledge',
      title: 'Concept',
      since: version,
      lifecycleRationale: 'Dependent agreement is under review.',
      statement: 'A settled conceptual boundary.',
      criteria: [{ id: 'K-TEST-0001-A', text: 'One conceptual criterion.' }],
    });
    const report = getSpecLifecycleReport(createSpecWorkspace([knowledge]), version);
    expect(report.rows[0].gaps).toEqual([]);
    expect(report.rows[0].evidence).toEqual([]);
    expect(report.unreviewedEntities).toEqual(['K-TEST-0001']);
  });

  it('loads a deterministic report and rejects missing or escaping disposition evidence', async () => {
    await withCatalog([contract(), testEntity()], async (root) => {
      const workspace = await loadSpecWorkspaceFromDirectory(path.join(root, 'spec'));
      const directory = path.join(root, 'internal/releases', version);
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(root, 'evidence.txt'), 'Recorded evidence');
      await writeFile(path.join(directory, 'lifecycle-dispositions.json'), JSON.stringify(plan()));
      const report = await loadSpecLifecycleReport(root, version, workspace);
      expect(report.currentCatalogDigest).toMatch(/^sha256:[a-f0-9]{64}$/);
      expect(await loadSpecLifecycleReport(root, version, workspace)).toEqual(report);
      const invalid = plan();
      invalid.slices[0].evidence = ['missing.txt'];
      await writeFile(path.join(directory, 'lifecycle-dispositions.json'), JSON.stringify(invalid));
      await expect(loadSpecLifecycleReport(root, version, workspace)).rejects.toThrow();
      invalid.slices[0].evidence = ['../outside.txt'];
      await writeFile(path.join(directory, 'lifecycle-dispositions.json'), JSON.stringify(invalid));
      await expect(loadSpecLifecycleReport(root, version, workspace)).rejects.toThrow(
        /inside the repository/
      );
    });
  });

  it('proves the real A11y relationship slice remains draft while the rest remains unreviewed', async () => {
    const root = process.cwd();
    const workspace = await loadSpecWorkspaceFromDirectory(path.join(root, 'spec'));
    expect(workspace.issues).toEqual([]);
    const report = await loadSpecLifecycleReport(root, '0.3.0-alpha.0', workspace);
    const ids = ['C-A11Y-PART-RELATIONSHIP-0001', 'T-A11Y-PART-RELATIONSHIP-0001'];
    const rows = report.rows.filter((row) => ids.includes(row.entityId));
    expect(rows).toHaveLength(2);
    for (const row of rows) {
      expect(row.status).toBe('draft');
      expect(row.disposition?.disposition).toBe('remain-draft');
      expect(row.activationBlockers).toHaveLength(1);
      expect(
        row.evidence.filter((item) => item.required && item.status === 'planned')
      ).toHaveLength(6);
    }
    expect(checkSpecLifecycleDispositions(report, ids)).toEqual([]);
    expect(
      checkSpecLifecycleDispositions(report).some((issue) => issue.code === 'missing-disposition')
    ).toBe(true);
    expect(report.summary.legacyActive).toBeGreaterThan(0);
  });
});
