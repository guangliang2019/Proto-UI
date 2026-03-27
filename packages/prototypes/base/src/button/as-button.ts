import { asFocusable, asTrigger, defineAsHook } from '@proto.ui/core';
import { ButtonAsHookContract, ButtonExposes, ButtonProps } from './types';

export const asButton = defineAsHook<ButtonProps, ButtonExposes, ButtonAsHookContract>({
  name: 'as-button',
  mode: 'once',
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
    const focusable = asFocusable({ disabled: false });
    const hovered = def.state.fromInteraction('hovered');
    const focused = def.state.fromInteraction('focused');
    const focusVisible = def.state.fromInteraction('focusVisible');
    const pressed = def.state.fromInteraction('pressed');

    const syncDisabled = (nextDisabled: boolean) => {
      disabled.set(nextDisabled, 'reason: sync disabled');
      focusable.setDisabled(nextDisabled);
      if (nextDisabled) {
        hovered.set(false, 'reason: disabled=true => reset hovered');
        focused.set(false, 'reason: disabled=true => reset focused');
        focusVisible.set(false, 'reason: disabled=true => reset focusVisible');
        pressed.set(false, 'reason: disabled=true => reset pressed');
      }
    };

    def.lifecycle.onCreated((run) => {
      syncDisabled(!!run.props.get().disabled);
    });

    def.props.watch(['disabled'], (run, next) => {
      syncDisabled(!!next.disabled);
    });

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

    focusable.focused.watch((_run, event) => {
      if (event.type === 'disconnect') {
        focused.set(false, 'reason: focusable.focused.disconnect');
        return;
      }
      focused.set(event.next, 'reason: focusable.focused.watch');
    });
    focusable.focusVisible.watch((_run, event) => {
      if (event.type === 'disconnect') {
        focusVisible.set(false, 'reason: focusable.focusVisible.disconnect');
        return;
      }
      focusVisible.set(event.next, 'reason: focusable.focusVisible.watch');
    });
    let keyboardModality = false;
    def.event.onGlobal('key.down', () => {
      keyboardModality = true;
    });
    def.event.on('pointer.down', () => {
      keyboardModality = false;
      if (focusable.isFocused()) {
        focusable.focus({ reason: 'pointer' });
      }
    });
    def.event.on('native:focus', () => {
      if (disabled.get()) return;
      focusable.focus({ reason: keyboardModality ? 'keyboard' : 'programmatic' });
    });
    def.event.on('native:blur', () => {
      focusable.blur();
    });
    def.expose.state('focused', focusable.focused);
    def.expose.state('focusVisible', focusable.focusVisible);

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
