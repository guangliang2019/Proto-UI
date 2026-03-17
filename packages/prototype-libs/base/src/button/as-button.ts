import { asTrigger, defineAsHook } from '@proto-ui/core';
import { ButtonAsHookContract, ButtonExposes, ButtonProps } from './types';

export const asButton = defineAsHook<ButtonProps, ButtonExposes, ButtonAsHookContract>({
  name: 'as-button',
  setup: (def) => {
    asTrigger();

    def.props.define({
      disabled: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      disabled: false,
    });

    const disabled = def.state.fromInteraction('disabled');
    def.expose.state('disabled', disabled);

    def.props.watch(['disabled'], (run, next) => {
      const nextDisabled = !!next.disabled;
      disabled.set(nextDisabled, 'reason: props.watch(disabled)');
      if (nextDisabled) {
        hovered.set(false, 'reason: disabled=true => reset hovered');
        focused.set(false, 'reason: disabled=true => reset focused');
        focusVisible.set(false, 'reason: disabled=true => reset focusVisible');
        pressed.set(false, 'reason: disabled=true => reset pressed');
      }
    });

    const hovered = def.state.fromInteraction('hovered');
    def.event
      .on('pointer.enter', () => {
        if (disabled.get()) return;
        hovered.set(true, 'reason: event.on(pointer.enter)');
      })
      .desc('asButton: pointer enter');
    def.event
      .on('pointer.leave', () => {
        if (disabled.get()) return;
        hovered.set(false, 'reason: event.on(pointer.leave)');
      })
      .desc('asButton: pointer leave');
    def.expose.state('hovered', hovered);

    const focused = def.state.fromInteraction('focused');
    const focusVisible = def.state.fromInteraction('focusVisible');
    let keyboardModality = false;
    def.event.onGlobal('key.down', () => {
      keyboardModality = true;
    });
    def.event.on('pointer.down', () => {
      keyboardModality = false;
      focusVisible.set(false, 'reason: event.on(pointer.down) => clear focusVisible');
    });
    def.event.on('native:focus', () => {
      if (disabled.get()) return;
      focused.set(true, 'reason: event.on(native:focus)');
      focusVisible.set(
        keyboardModality,
        `reason: event.on(native:focus) => keyboardModality=${keyboardModality}`
      );
    });
    def.event.on('native:blur', () => {
      focused.set(false, 'reason: event.on(native:blur)');
      focusVisible.set(false, 'reason: event.on(native:blur)');
    });
    def.expose.state('focused', focused);
    def.expose.state('focusVisible', focusVisible);

    const pressed = def.state.fromInteraction('pressed');
    def.event.on('pointer.down', () => {
      if (disabled.get()) return;
      pressed.set(true, 'reason: event.on(pointer.down)');
    });
    def.event.on('pointer.up', () => {
      pressed.set(false, 'reason: event.on(pointer.up)');
    });
    def.event.on('pointer.cancel', () => {
      pressed.set(false, 'reason: event.on(pointer.cancel)');
    });
    def.event.on('pointer.leave', () => {
      pressed.set(false, 'reason: event.on(pointer.leave)');
    });
    def.event.on('press.commit', () => {
      pressed.set(false, 'reason: event.on(press.commit)');
    });
    def.expose.state('pressed', pressed);

    def.expose.event('click', { payload: 'void' });
    def.event.on('press.commit', (run) => {
      if (disabled.get()) return;
      run.event.emit('click');
    });
  },
});
