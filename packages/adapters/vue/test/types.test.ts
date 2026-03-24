import { describe, expectTypeOf, it } from 'vitest';
import { definePrototype, type ExposeEvent, type ExposeState } from '@proto-ui/core';

import type { ProtoVueEmits, ProtoVueEventProps, ProtoVueProps } from '../src/types';

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
  name: 'vue-type-demo',
  setup() {
    return (r) => [r.el('div', 'ok')];
  },
});

describe('adapter-vue: type helpers', () => {
  it('maps exposed events to onX listener props', () => {
    expectTypeOf<ProtoVueEventProps<typeof proto>>().toEqualTypeOf<{
      onClick?: () => void;
      onCheckedChange?: (payload: { checked: boolean }, options?: Record<string, unknown>) => void;
    }>();
  });

  it('combines proto props with host props and listener props', () => {
    expectTypeOf<ProtoVueProps<typeof proto>>().toEqualTypeOf<{
      label?: string;
      disabled?: boolean;
      hostClass?: string | string[] | Record<string, boolean>;
      hostStyle?: Record<string, string> | string | Array<Record<string, string>>;
      onClick?: () => void;
      onCheckedChange?: (payload: { checked: boolean }, options?: Record<string, unknown>) => void;
    }>({} as any);
  });

  it('derives Vue emits tuples from exposed events', () => {
    expectTypeOf<ProtoVueEmits<typeof proto>>().toEqualTypeOf<{
      click: [];
      checkedChange: [payload: { checked: boolean }, options?: Record<string, unknown>];
    }>({} as any);
  });
});
