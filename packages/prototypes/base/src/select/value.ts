import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { SELECT_CONTEXT, SELECT_FAMILY } from './shared';
import type { SelectValueAsHookContract, SelectValueExposes, SelectValueProps } from './types';

function setupSelectValue(def: DefHandle<SelectValueProps, SelectValueExposes>) {
  def.anatomy.claim(SELECT_FAMILY, { role: 'value' });

  def.props.define({
    placeholder: { type: 'string', empty: 'fallback' },
  });
  def.props.setDefaults({
    placeholder: '',
  });

  let mounted = false;
  let renderedValue = '';

  const computeDisplayValue = (run: any) => {
    const ctx = run.context.read(SELECT_CONTEXT);
    const placeholder = run.props.get().placeholder ?? '';
    return ctx.textValue || ctx.value || placeholder || '';
  };

  const syncRenderedValue = (run: any, requestRender: boolean) => {
    const nextValue = computeDisplayValue(run);
    if (nextValue === renderedValue) return;
    renderedValue = nextValue;
    if (requestRender && mounted) {
      run.update();
    }
  };

  def.context.subscribe(SELECT_CONTEXT, (run) => {
    syncRenderedValue(run, true);
  });

  def.lifecycle.onCreated((run) => {
    syncRenderedValue(run, false);
  });

  def.lifecycle.onMounted((run) => {
    syncRenderedValue(run, false);
    mounted = true;
  });

  def.props.watch(['placeholder'], (run) => {
    syncRenderedValue(run, true);
  });

  def.lifecycle.onUnmounted(() => {
    mounted = false;
  });

  return () => (renderedValue ? [renderedValue] : null);
}

export const asSelectValue = defineAsHook<
  SelectValueProps,
  SelectValueExposes,
  SelectValueAsHookContract
>({
  name: 'as-select-value',
  mode: 'once',
  setup: setupSelectValue,
});

const selectValue = definePrototype({
  name: 'base-select-value',
  setup: setupSelectValue,
});

export default selectValue;
