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
      {
        id: 'runtime',
        kind: 'runtime-test',
        status,
        path: 'runtime.test.ts',
        required: true,
        consumesCases: [caseId],
      },
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
    await writeFile(path.join(root, 'runtime.test.ts'), 'export {};\n');
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
      checkSpecLifecycleAuthoring(
        legacy,
        {
          ...legacy,
          activeSince: version,
          lifecycleRationale: 'Reviewed at the recorded version.',
        },
        createSpecWorkspace([legacy, testEntity('passing')]),
        version
      )
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
    expect(
      checkSpecLifecycleAuthoring(
        draft,
        active,
        createSpecWorkspace([active, testEntity('passing')]),
        version
      )
    ).toEqual([]);
    expect(
      checkSpecLifecycleAuthoring(
        undefined,
        { ...active, revisions: [] },
        createSpecWorkspace([active, testEntity('passing')]),
        version
      )
    ).toEqual([]);
  });

  it('allows legacy active boundary maintenance without inventing activation provenance', () => {
    const legacy = contract({ status: 'active', lifecycleRationale: undefined });
    const corrected = {
      ...legacy,
      since: '0.1.0',
      lifecycleRationale: 'Corrected introduction from the catalog record.',
    };
    expect(checkSpecLifecycleAuthoring(legacy, corrected)).toEqual([]);
    expect(corrected.activeSince).toBeUndefined();
    expect(checkSpecLifecycleAuthoring(undefined, corrected)).toContainEqual(
      expect.stringContaining('requires activation provenance')
    );
    expect(
      checkSpecLifecycleAuthoring(legacy, { ...corrected, lifecycleRationale: undefined })
    ).toContainEqual(expect.stringContaining('requires lifecycleRationale'));
  });

  it('checks actual active admission against catalog evidence at activeSince', () => {
    const draft = contract();
    const active = contract({
      status: 'active',
      activeSince: version,
      lifecycleRationale: 'Required evidence was accepted.',
      revisions: [{ version, change: 'admitted', summary: 'Admission was reviewed.' }],
    });
    expect(checkSpecLifecycleAuthoring(draft, active)).toContainEqual(
      expect.stringContaining('requires the current workspace')
    );
    const empty = { ...active, statement: undefined, criteria: [] };
    expect(
      checkSpecLifecycleAuthoring(draft, empty, createSpecWorkspace([empty]), version)
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining('missing-statement'),
        expect.stringContaining('missing-criteria'),
      ])
    );
    const evidence = testEntity('passing');
    evidence.since = '0.3.0';
    expect(
      checkSpecLifecycleAuthoring(draft, active, createSpecWorkspace([active, evidence]), version)
    ).toContainEqual(expect.stringContaining('criterion-needs-evidence'));
    evidence.since = version;
    const ready = createSpecWorkspace([active, evidence]);
    expect(checkSpecLifecycleAuthoring(draft, active, ready, version)).toEqual([]);
    expect(checkSpecLifecycleAuthoring(undefined, active, ready, version)).toEqual([]);
  });

  it('requires recorded Prototype anatomy even when generic admission evidence passes', () => {
    const id = 'P-LIFECYCLE-TEST-0001';
    const draft = contract({
      id,
      type: 'prototype',
      criteria: [{ id: `${id}-A`, text: 'A governed requirement.' }],
    });
    const active = {
      ...draft,
      status: 'active' as const,
      activeSince: version,
      lifecycleRationale: 'The prototype was reviewed.',
      revisions: [{ version, change: 'admitted', summary: 'Admission was reviewed.' }],
    };
    const evidence = testEntity('passing');
    evidence.verifies = { prototypes: [{ id }] };
    evidence.cases[0].covers = [`${id}-A`];
    const workspace = createSpecWorkspace([active, evidence]);
    expect(checkSpecLifecycleAuthoring(draft, active, workspace, version)).toContainEqual(
      expect.stringContaining('missing-anatomy')
    );
    const declared = validateSpecEntity({
      ...active,
      anatomy: {
        family: 'lifecycle-fixture',
        roles: { root: { cardinality: { min: 1, max: 1 } } },
      },
    });
    expect(checkSpecLifecycleAuthoring(draft, declared, workspace, version)).toEqual([]);
  });

  it.each([{ covers: [] }, { covers: ['C-ABSENT-0001-A'] }, { covers: ['C-OTHER-0001-A'] }])(
    'rejects Test admission with invalid case covers: $covers',
    ({ covers }) => {
      const draft = testEntity('passing');
      const active: SpecEntity = {
        ...draft,
        status: 'active',
        activeSince: version,
        lifecycleRationale: 'The execution map was reviewed.',
        revisions: [{ version, change: 'admitted', summary: 'Admission was reviewed.' }],
        cases: [{ ...draft.cases[0], covers }],
      };
      const other = contract({
        id: 'C-OTHER-0001',
        criteria: [{ id: 'C-OTHER-0001-A', text: 'Another requirement.' }],
      });
      const workspace = createSpecWorkspace([contract(), other, active]);
      expect(checkSpecLifecycleAuthoring(draft, active, workspace, version)).toContainEqual(
        expect.stringMatching(/case-(needs-criteria|invalid-criterion)/)
      );
      active.cases[0].covers = [criterionId];
      expect(checkSpecLifecycleAuthoring(draft, active, workspace, version)).toEqual([]);
    }
  );

  it('accepts case mappings on exercised targets without turning them into verifies', () => {
    const draft = testEntity('passing');
    const active: SpecEntity = {
      ...draft,
      status: 'active',
      activeSince: version,
      lifecycleRationale: 'The execution map was reviewed.',
      revisions: [{ version, change: 'admitted', summary: 'Admission was reviewed.' }],
      verifies: {},
      exercises: { contracts: [{ id: contractId }] },
    };
    const workspace = createSpecWorkspace([contract(), active]);
    expect(checkSpecLifecycleAuthoring(draft, active, workspace, version)).toEqual([]);
    expect(
      getSpecLifecycleReport(workspace, version).rows.find((row) => row.entityId === contractId)
        ?.gaps
    ).toContainEqual(expect.objectContaining({ code: 'criterion-needs-evidence' }));
    active.exercises = {};
    active.implementations[0].exercises = [contractId];
    expect(checkSpecLifecycleAuthoring(draft, active, workspace, version)).toEqual([]);
    active.implementations[0].exercises = [];
    const owner = contract({ verifies: { tests: [testId] } });
    expect(
      checkSpecLifecycleAuthoring(draft, active, createSpecWorkspace([owner, active]), version)
    ).toEqual([]);
  });

  it.each(['replacement', 'legacy', 'promotion', 'new-active', 'new-deprecated', 'new-removed'])(
    'does not let newly recorded passing evidence justify historical activation: %s',
    (change) => {
      const currentVersion = '0.3.0';
      const before = change.startsWith('new-')
        ? undefined
        : contract({
            status: change === 'promotion' ? 'draft' : 'active',
            activeSince: change === 'replacement' ? currentVersion : undefined,
          });
      const after = contract({
        status:
          change === 'new-deprecated'
            ? 'deprecated'
            : change === 'new-removed'
              ? 'removed'
              : 'active',
        activeSince: version,
        deprecatedSince: change === 'new-deprecated' ? '0.4.0' : undefined,
        removedSince: change === 'new-removed' ? '0.4.0' : undefined,
        lifecycleRationale: 'The activation boundary was reviewed.',
        revisions: [{ version, change: 'admitted', summary: 'Admission was reviewed.' }],
      });
      const oldTest = testEntity();
      oldTest.implementations = [];
      const newMapping = { ...oldTest, implementations: testEntity('passing').implementations };
      const workspace = createSpecWorkspace([after, newMapping]);
      expect(
        getSpecLifecycleReport(workspace, version).rows.find((row) => row.entityId === contractId)
          ?.gaps
      ).toEqual([]);
      expect(checkSpecLifecycleAuthoring(before, after, workspace, currentVersion)).toContainEqual(
        expect.stringContaining(
          'historical activation requires a separately reviewed provenance mechanism'
        )
      );
      after.activeSince = currentVersion;
      after.revisions[0].version = currentVersion;
      expect(checkSpecLifecycleAuthoring(before, after, workspace, currentVersion)).toEqual([]);
    }
  );

  it('requires an explicit current release train for mechanical admission', () => {
    const active = contract({ status: 'active', activeSince: version });
    const workspace = createSpecWorkspace([active, testEntity('passing')]);
    expect(checkSpecLifecycleAuthoring(undefined, active, workspace)).toContainEqual(
      expect.stringContaining('requires the current release train')
    );
    expect(checkSpecLifecycleAuthoring(undefined, active, workspace, version)).toEqual([]);
  });

  it('does not replace recorded historical activation with a current boundary', () => {
    const before = contract({ status: 'active', activeSince: version });
    const currentVersion = '0.3.0';
    const after = {
      ...before,
      activeSince: currentVersion,
      lifecycleRationale: 'The boundary was corrected.',
    };
    const workspace = createSpecWorkspace([after, testEntity('passing')]);
    expect(checkSpecLifecycleAuthoring(before, after, workspace, currentVersion)).toContainEqual(
      expect.stringContaining(
        'historical activation requires a separately reviewed provenance mechanism'
      )
    );
    expect(
      checkSpecLifecycleAuthoring(
        before,
        { ...before, title: 'History retained' },
        workspace,
        currentVersion
      )
    ).toEqual([]);
  });

  it("does not inherit another identity's activation history for new admission", () => {
    const before = contract({
      id: 'C-OLD-LIFECYCLE-0001',
      since: '0.1.0',
      status: 'active',
      activeSince: '0.1.0',
      criteria: [],
    });
    const active = contract({ status: 'active', activeSince: version });
    expect(
      checkSpecLifecycleAuthoring(
        before,
        active,
        createSpecWorkspace([active, testEntity('passing')]),
        version
      )
    ).toEqual([]);
  });

  it('rejects actual admission with blockers or incomplete required implementations', () => {
    const draft = contract();
    const active = contract({
      status: 'active',
      activeSince: version,
      lifecycleRationale: 'Required evidence was accepted.',
      revisions: [{ version, change: 'admitted', summary: 'Admission was reviewed.' }],
    });
    const evidence = testEntity('passing');
    evidence.implementations.push({
      ...evidence.implementations[0],
      id: 'adapter',
      status: 'planned',
    });
    evidence.openQuestions = [
      {
        id: `${testId}-Q-ADMISSION`,
        question: 'Is the complete adapter scope ready?',
        blocks: [`activation:${contractId}`],
      },
    ];
    const issues = checkSpecLifecycleAuthoring(
      draft,
      active,
      createSpecWorkspace([active, evidence]),
      version
    );
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining('activation-blocked'),
        expect.stringContaining('required-evidence-incomplete'),
      ])
    );
    evidence.openQuestions = [];
    evidence.implementations[1].status = 'passing';
    expect(
      checkSpecLifecycleAuthoring(draft, active, createSpecWorkspace([active, evidence]), version)
    ).toEqual([]);
  });

  it.each(['active', 'deprecated', 'removed'] as const)(
    'revalidates a replacement activation boundary for %s',
    (status) => {
      const before = contract({
        status,
        activeSince: '0.3.0',
        deprecatedSince: status === 'deprecated' ? '0.4.0' : undefined,
        removedSince: status === 'removed' ? '0.4.0' : undefined,
      });
      const after = {
        ...before,
        activeSince: version,
        lifecycleRationale: 'The activation record was corrected.',
      };
      const evidence = testEntity('passing');
      evidence.since = '0.3.0';
      expect(
        checkSpecLifecycleAuthoring(before, after, createSpecWorkspace([before, evidence]), version)
      ).toContainEqual(expect.stringContaining('criterion-needs-evidence'));
      expect(checkSpecLifecycleAuthoring(before, after)).toContainEqual(
        expect.stringContaining('requires the current workspace')
      );
      evidence.since = version;
      expect(
        checkSpecLifecycleAuthoring(before, after, createSpecWorkspace([before, evidence]), version)
      ).toEqual([]);
      expect(checkSpecLifecycleAuthoring(before, { ...before, title: 'Edited prose' })).toEqual([]);
    }
  );

  it.each(['decision', 'knowledge'] as const)(
    'does not invent runtime evidence for %s admission',
    (type) => {
      const id = `${type === 'decision' ? 'D' : 'K'}-LIFECYCLE-TEST-0001`;
      const active = validateSpecEntity({
        id,
        type,
        title: 'Reviewed explanation',
        status: 'active',
        since: version,
        activeSince: version,
        lifecycleRationale: 'The bounded explanation was reviewed.',
        statement: 'A supported explanatory claim.',
        criteria: [{ id: `${id}-A`, text: 'The claim has a reviewed basis.' }],
      });
      expect(
        checkSpecLifecycleAuthoring(undefined, active, createSpecWorkspace([active]), version)
      ).toEqual([]);
    }
  );

  it.each(['deprecate', 'remove', 'correct-boundary'])(
    'preserves the revision prefix when an existing lifecycle changes: %s',
    (transition) => {
      const before = contract({
        status: transition === 'remove' ? 'deprecated' : 'active',
        activeSince: version,
        deprecatedSince: transition === 'remove' ? '0.3.0' : undefined,
        revisions: [{ version, change: 'admitted', summary: 'Original admission record.' }],
      });
      const after: SpecEntity = {
        ...before,
        status:
          transition === 'remove'
            ? 'removed'
            : transition === 'deprecate'
              ? 'deprecated'
              : 'active',
        since: transition === 'correct-boundary' ? '0.1.0' : version,
        deprecatedSince: transition === 'correct-boundary' ? undefined : '0.3.0',
        removedSince: transition === 'remove' ? '0.4.0' : undefined,
        lifecycleRationale: 'The recorded lifecycle boundary was reviewed.',
        revisions: [],
      };
      expect(checkSpecLifecycleAuthoring(before, after)).toContainEqual(
        expect.stringContaining('preserve prior revisions')
      );
      after.revisions = [{ ...before.revisions[0], summary: 'Rewritten old record.' }];
      expect(checkSpecLifecycleAuthoring(before, after)).toContainEqual(
        expect.stringContaining('preserve prior revisions')
      );
      after.revisions = before.revisions;
      expect(checkSpecLifecycleAuthoring(before, after)).toEqual([]);
    }
  );

  it('grandfathers only unchanged legacy blockers on the same entity and question', () => {
    const question = {
      id: `${contractId}-Q-LEGACY`,
      question: 'What remains?',
      blocks: ['legacy follow-up'],
    };
    const legacy = contract({ openQuestions: [question] });
    expect(checkSpecLifecycleAuthoring(legacy, { ...legacy, title: 'Edited prose' })).toEqual([]);
    for (const changed of [
      { ...question, blocks: ['actvation:' + contractId] },
      { ...question, id: `${contractId}-Q-NEW` },
      { ...question, blocks: [' legacy follow-up '] },
    ]) {
      expect(
        checkSpecLifecycleAuthoring(legacy, { ...legacy, openQuestions: [changed] })
      ).toContainEqual(expect.stringContaining('unclassified blocker'));
    }
    expect(checkSpecLifecycleAuthoring(undefined, legacy)).toContainEqual(
      expect.stringContaining('unclassified blocker')
    );
    expect(
      checkSpecLifecycleAuthoring(legacy, {
        ...legacy,
        openQuestions: [{ ...question, blocks: [`activation:${contractId}`] }],
      })
    ).toEqual([]);
    expect(checkSpecLifecycleAuthoring(legacy, { ...legacy, openQuestions: [] })).toEqual([]);
  });

  it.each(['active', 'draft', 'deprecated', 'removed'] as const)(
    'does not erase recorded activation provenance when changing to %s',
    (status) => {
      const before = contract({ status: 'active', activeSince: version });
      const after = contract({
        status,
        deprecatedSince: status === 'deprecated' ? '0.3.0' : undefined,
        removedSince: status === 'removed' ? '0.3.0' : undefined,
        lifecycleRationale: 'The lifecycle boundary was reviewed.',
      });
      expect(checkSpecLifecycleAuthoring(before, after)).toContainEqual(
        expect.stringContaining('retain recorded activeSince')
      );
      if (status !== 'draft')
        expect(checkSpecLifecycleAuthoring(before, { ...after, activeSince: version })).toEqual([]);
    }
  );

  it('preserves ordinary identities instead of silently deleting their history', () => {
    expect(checkSpecLifecycleAuthoring(contract(), undefined)).toContainEqual(
      expect.stringContaining('retain the entity')
    );
    expect(checkSpecLifecycleAuthoring(undefined, undefined)).toEqual([]);
  });

  it.each(['draft', 'active', 'deprecated'])(
    'does not reactivate a removed identity as %s',
    (status) => {
      const removed = contract({ status: 'removed', removedSince: '0.3.0' });
      const after = contract({
        status,
        lifecycleRationale: 'A new review attempts to restore availability.',
        activeSince: status === 'active' ? version : undefined,
        deprecatedSince: status === 'deprecated' ? '0.3.0' : undefined,
        revisions: [{ version, change: 'admitted', summary: 'Required conformance was accepted.' }],
      });
      expect(checkSpecLifecycleAuthoring(removed, after)).toContainEqual(
        expect.stringContaining('removed is terminal')
      );
      expect(
        checkSpecLifecycleAuthoring(removed, { ...removed, title: 'Clarified historical title' })
      ).toEqual([]);
    }
  );

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
    expect(
      checkSpecLifecycleAuthoring(
        draft,
        active,
        createSpecWorkspace([active, testEntity('passing')]),
        version
      )
    ).toEqual([]);
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
    expect(
      checkSpecLifecycleAuthoring(
        draft,
        active,
        createSpecWorkspace([active, testEntity('passing')]),
        version
      )
    ).toEqual([]);
  });
});

describe('ordinary lifecycle reporting', () => {
  it('does not count a pathless passing record as case, criterion, or promotion evidence', () => {
    const test = testEntity('passing');
    test.implementations[0].path = undefined;
    const report = getSpecLifecycleReport(
      createSpecWorkspace([contract(), test]),
      version,
      plan(undefined, 'promote')
    );
    const contractRow = report.rows.find((row) => row.entityId === contractId)!;
    const testRow = report.rows.find((row) => row.entityId === testId)!;
    expect(contractRow.gaps).toContainEqual(
      expect.objectContaining({ code: 'criterion-needs-evidence' })
    );
    expect(testRow.gaps).toContainEqual(expect.objectContaining({ code: 'case-needs-evidence' }));
    expect(testRow.gaps).toContainEqual(expect.objectContaining({ code: 'evidence-needs-path' }));
    expect(checkSpecLifecycleDispositions(report)).toContainEqual(
      expect.objectContaining({ code: 'promotion-evidence-incomplete' })
    );
    test.implementations[0].path = 'runtime.test.ts';
    expect(
      checkSpecLifecycleDispositions(
        getSpecLifecycleReport(
          createSpecWorkspace([contract(), test]),
          version,
          plan(undefined, 'promote')
        )
      )
    ).toEqual([]);
  });

  it('validates real passing implementation files while allowing planned future paths', async () => {
    await withCatalog([contract(), testEntity('passing')], async (root) => {
      const load = () => loadSpecWorkspaceFromDirectory(path.join(root, 'spec'));
      expect((await load()).issues).toEqual([]);
      await rm(path.join(root, 'runtime.test.ts'));
      expect((await load()).issues).toContainEqual(
        expect.objectContaining({ message: expect.stringContaining('Passing implementation') })
      );
      await mkdir(path.join(root, 'runtime.test.ts'));
      expect((await load()).issues).toContainEqual(
        expect.objectContaining({ message: expect.stringContaining('Passing implementation') })
      );
      const planned = testEntity();
      planned.implementations[0].path = 'future.test.ts';
      await writeFile(path.join(root, 'spec', `${testId}.yaml`), JSON.stringify(planned));
      expect((await load()).issues).toEqual([]);
    });
  });

  it('discovers implementation-only exercises without treating them as criterion verification', () => {
    const partId = 'C-LIFECYCLE-PART-0001';
    const part = contract({
      id: partId,
      criteria: [{ id: `${partId}-A`, text: 'The part requirement.' }],
    });
    const test = testEntity();
    test.implementations[0].exercises = [partId];
    const report = getSpecLifecycleReport(createSpecWorkspace([contract(), part, test]), version);
    const row = report.rows.find((row) => row.entityId === partId)!;
    expect(row.evidence).toContainEqual(
      expect.objectContaining({ testId, implementationId: 'runtime' })
    );
    expect(row.gaps).toContainEqual(
      expect.objectContaining({ code: 'required-evidence-incomplete' })
    );
    test.implementations[0].status = 'passing';
    const passing = getSpecLifecycleReport(
      createSpecWorkspace([contract(), part, test]),
      version
    ).rows.find((entry) => entry.entityId === partId)!;
    expect(passing.evidence).toContainEqual(
      expect.objectContaining({ implementationId: 'runtime', status: 'passing' })
    );
    expect(passing.gaps).toContainEqual(
      expect.objectContaining({ code: 'criterion-needs-evidence' })
    );
  });
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

  it('retains errors from another entity in the selected disposition slice', () => {
    const activeId = 'C-LIFECYCLE-TEST-0002';
    const active = contract({
      id: activeId,
      status: 'active',
      activeSince: version,
      criteria: [{ id: `${activeId}-A`, text: 'Another requirement.' }],
    });
    const report = getSpecLifecycleReport(
      createSpecWorkspace([contract(), active]),
      version,
      plan([contractId, activeId])
    );
    expect(checkSpecLifecycleDispositions(report, [contractId])).toContainEqual(
      expect.objectContaining({ code: 'disposition-status-mismatch', entityId: activeId })
    );
    const duplicatePlan = plan([contractId, activeId]);
    duplicatePlan.slices.push({ ...plan([activeId]).slices[0], id: 'duplicate-owner' });
    const duplicate = getSpecLifecycleReport(
      createSpecWorkspace([contract(), { ...active, status: 'draft', activeSince: undefined }]),
      version,
      duplicatePlan
    );
    expect(checkSpecLifecycleDispositions(duplicate, [contractId])).toContainEqual(
      expect.objectContaining({ code: 'duplicate-disposition', entityId: activeId })
    );
  });

  it('recovers every implicated slice when the selected disposition is conflicted', () => {
    const activeId = 'C-LIFECYCLE-TEST-0002';
    const missingId = 'C-ABSENT-0001';
    const active = contract({
      id: activeId,
      status: 'active',
      activeSince: version,
      criteria: [{ id: `${activeId}-A`, text: 'Another requirement.' }],
    });
    const dispositions = plan([contractId, activeId]);
    dispositions.slices.push({
      ...dispositions.slices[0],
      id: 'conflicting',
      entities: [contractId, missingId],
    });
    const report = getSpecLifecycleReport(
      createSpecWorkspace([contract(), active]),
      version,
      dispositions
    );
    expect(report.rows.find((row) => row.entityId === contractId)?.disposition).toBeUndefined();
    const issues = checkSpecLifecycleDispositions(report, [contractId]);
    expect(issues).toContainEqual(
      expect.objectContaining({ code: 'duplicate-disposition', entityId: contractId })
    );
    expect(issues).toContainEqual(
      expect.objectContaining({ code: 'disposition-status-mismatch', entityId: activeId })
    );
    expect(issues).toContainEqual(
      expect.objectContaining({ code: 'unknown-disposition-entity', entityId: missingId })
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

  it('withholds every disposition sharing a slice ID even with disjoint members', () => {
    const duplicate = plan([contractId]);
    duplicate.slices.push(plan([testId]).slices[0]);
    for (const slices of [duplicate.slices, [...duplicate.slices].reverse()]) {
      const report = getSpecLifecycleReport(
        createSpecWorkspace([contract(), testEntity()]),
        version,
        { ...duplicate, slices }
      );
      expect(report.rows.every((row) => row.disposition === undefined)).toBe(true);
      expect(report.summary.reviewedDrafts).toBe(0);
      expect(report.unreviewedEntities).toEqual([contractId, testId]);
      expect(report.dispositionSlices).toHaveLength(2);
      expect(checkSpecLifecycleDispositions(report, [contractId])).toContainEqual(
        expect.objectContaining({ code: 'duplicate-slice' })
      );
    }
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

  it.each(['deprecated', 'removed'])(
    'retains unknown activation provenance for available legacy %s entities',
    (status) => {
      const workspace = createSpecWorkspace([
        contract({
          status,
          since: '0.1.0',
          deprecatedSince: '0.3.0',
          removedSince: status === 'removed' ? '0.4.0' : undefined,
        }),
      ]);
      const historical = getSpecLifecycleReport(workspace, version);
      expect(historical.rows[0].stableAtVersion).toBeNull();
      expect(historical.rows[0].draftAtVersion).toBe(false);
      expect(historical.summary.legacyActive).toBe(1);
      expect(historical.rows[0].gaps).toContainEqual(
        expect.objectContaining({ code: 'legacy-activation-provenance' })
      );
      expect(checkSpecLifecycleDispositions(historical)).toEqual([]);
      const deprecated = getSpecLifecycleReport(workspace, '0.3.0');
      expect(deprecated.rows[0].stableAtVersion).toBe(false);
      expect(deprecated.summary.legacyActive).toBe(1);
      expect(deprecated.rows[0].gaps).toContainEqual(
        expect.objectContaining({ code: 'legacy-activation-provenance' })
      );
      if (status === 'removed') expect(getSpecLifecycleReport(workspace, '0.4.0').rows).toEqual([]);
    }
  );

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
