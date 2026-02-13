import { defineAsHook } from '@proto-ui/core';
import { ButtonExposes, ButtonProps } from './types';

export const asButton = defineAsHook<ButtonProps, ButtonExposes>({
  name: 'as-button',
  setup: (def) => {
    def.props.define({
      disabled: { kind: 'boolean', empty: 'fallback' },
      onClick: { kind: 'object', empty: 'fallback' },
    });

    const disabled = def.state.bool('disabled', false);
    def.expose('disabled', disabled);

    def.props.watch(['disabled'], (run, next) => {
      disabled.set(next.disabled, 'reason: props.watch(disabled)');
    });

    // hover state
    const hovered = def.state.bool('hovered', false);
    def.expose('hovered', hovered);

    def.event.on('pointer.enter', () => hovered.set(true, 'reason: event.on(pointer.enter)'));

    def.event.on('pointer.leave', (run, ev) => {
      hovered.set(false, 'reason: event.on(pointer.leave)');
    });
  },
});
