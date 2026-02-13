// packages/runtime/test/contract/rule.matrix.fixture.ts
export type WhenDim = {
  id: 'props' | 'state' | 'context';
  title: string;
  expectations: string[];
};

export type IntentDim = {
  id: 'feedback.style' | 'state.set';
  title: string;
  expectations: string[];
};

export type ComboCase = {
  when: WhenDim['id'];
  intent: IntentDim['id'];
  expectations: string[];
};

export const whenDims: WhenDim[] = [
  {
    id: 'props',
    title: 'when deps: props',
    expectations: [
      'compiles RuleIR with prop deps recorded and de-duplicated',
      'evaluates when.eq using resolved props (=== semantics)',
      'logical all/any/not semantics with prop inputs',
      'prop changes trigger re-evaluation (no implicit batching assumptions)',
    ],
  },
  {
    id: 'state',
    title: 'when deps: state (Owned/Borrowed/Observed)',
    expectations: [
      'compiles RuleIR with state deps recorded and de-duplicated',
      'allows when to observe Owned/Borrowed/Observed handles',
      'state changes trigger re-evaluation for all view types',
      'no reliance on periodic update cycle (EDP-style triggering)',
    ],
  },
  {
    id: 'context',
    title: 'when deps: context (path + null fallback)',
    expectations: [
      'records context deps with static path',
      'missing provider resolves to null (no throw)',
      'invalid path resolves to null (no throw)',
      'context values are JSON-serializable objects or null',
    ],
  },
];

export const intentDims: IntentDim[] = [
  {
    id: 'feedback.style',
    title: 'intent: feedback.style',
    expectations: [
      'records feedback.style.use ops in declaration order',
      'semantic-merge of tokens (not last-wins)',
      'inactive rules contribute no tokens',
      'runtime may execute dynamically or output Plan equivalently',
    ],
  },
  {
    id: 'state.set',
    title: 'intent: state.set',
    expectations: [
      'only writable views are allowed (state contract defines writability)',
      'layer stack merge per state (later rules on top)',
      'rule deactivation removes only its layer',
      'fallback to last non-rule value when no layers remain',
      'set at most once per evaluation per state',
      'rule state writes must carry reason',
    ],
  },
];

export const combos: ComboCase[] = [
  {
    when: 'props',
    intent: 'feedback.style',
    expectations: [
      'prop-driven rules produce style tokens via semantic merge',
      'deactivation removes tokens on next evaluation',
    ],
  },
  {
    when: 'state',
    intent: 'feedback.style',
    expectations: [
      'state-driven style updates re-evaluate on state change',
      'no reliance on periodic update cycle',
    ],
  },
  {
    when: 'context',
    intent: 'feedback.style',
    expectations: [
      'context missing/invalid resolves to null without throw',
      'style output reflects current context value at evaluation',
    ],
  },
  {
    when: 'props',
    intent: 'state.set',
    expectations: [
      'prop-driven state intents merge by layer and apply once',
      'fallback to last non-rule value when no rules match',
    ],
  },
  {
    when: 'state',
    intent: 'state.set',
    expectations: [
      'state-driven state intents do not create multi-set churn per eval',
      'layer removal only affects the removed rule',
    ],
  },
  {
    when: 'context',
    intent: 'state.set',
    expectations: [
      'context null resolves to no-op or fallback without throw',
      'context is evaluated on-demand (no polling)',
    ],
  },
];
