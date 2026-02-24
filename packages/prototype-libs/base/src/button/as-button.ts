import { defineAsHook } from '@proto-ui/core';
import { ButtonExposes, ButtonProps } from './types';

export const asButton = defineAsHook<ButtonProps, ButtonExposes>({
  name: 'as-button',
  setup: (def) => {
    def.props.define({
      disabled: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      disabled: false,
    })

    // disabled state
    const disabled = def.state.bool('disabled', false);
    def.expose.state('disabled', disabled);

    def.props.watch(['disabled'], (run, next) => {
      disabled.set(next.disabled, 'reason: props.watch(disabled)');
    });

    // hover state
    const hovered = def.state.bool('hovered', false);
    def.event.on('pointer.enter', () => hovered.set(true, 'reason: event.on(pointer.enter)'));
    def.event.on('pointer.leave', () => {
      hovered.set(false, 'reason: event.on(pointer.leave)');
    });
    def.expose.state('hovered', hovered);

    // click event
    def.expose.event('click', { payload: 'void' });
    def.event.on('press.commit', (run) => {
      run.event.emit('click');
    });
  },
});
