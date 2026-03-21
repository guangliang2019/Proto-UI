import { describe, expectTypeOf, it } from 'vitest';
import { definePrototype, type ExposeEvent, type ExposeState } from '@proto-ui/core';

import type { ProtoReactEventProps, ProtoReactProps } from '../src/types';

type DemoProps = {
  label?: string;
  disabled?: boolean;
};

type DemoExposes = {
  checked: ExposeState<boolean>;
  click: ExposeEvent<void>;
  checkedChange: ExposeEvent<{ checked: boolean }>;
};

const proto = definePrototype<DemoProps, DemoExposes>({
  name: 'react-type-demo',
  setup() {
    return (r) => [r.el('div', 'ok')];
  },
});

describe('adapter-react: type helpers', () => {
  it('maps exposed events to onX handler props', () => {
    expectTypeOf<ProtoReactEventProps<typeof proto>>().toEqualTypeOf<{
      onClick?: () => void;
      onCheckedChange?: (payload: { checked: boolean }) => void;
    }>();
  });

  it('combines proto props with host props and event props', () => {
    expectTypeOf<ProtoReactProps<typeof proto>>().toEqualTypeOf<{
      label?: string;
      disabled?: boolean;
      children?: any;
      hostClassName?: string;
      hostStyle?: any;
      onClick?: () => void;
      onCheckedChange?: (payload: { checked: boolean }) => void;
    }>();
  });
});
