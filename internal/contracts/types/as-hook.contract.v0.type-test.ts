import type { AsHookResult, State } from '@proto-ui/core';

type Props = { disabled?: boolean };

type ButtonContract = {
  state: {
    hovered: State<boolean>;
    pressed: State<boolean>;
  };
  event: {
    click: void;
    submit: { source: 'keyboard' | 'pointer' };
  };
};

declare const buttonResult: AsHookResult<Props, ButtonContract>;

// New contract shape should project state handles and event keys with stable names.
buttonResult.stateHandles?.hovered.get();
buttonResult.stateHandles?.pressed.watch;

const clickKey = buttonResult.artifacts?.eventKeys?.click;
const submitKey = buttonResult.artifacts?.eventKeys?.submit;

const exactClick: 'click' | undefined = clickKey;
const exactSubmit: 'submit' | undefined = submitKey;

// Legacy third generic as raw state map should keep working.
type LegacyStateMap = {
  open: State<boolean>;
};

declare const legacyResult: AsHookResult<Props, LegacyStateMap>;

legacyResult.stateHandles?.open.get();
