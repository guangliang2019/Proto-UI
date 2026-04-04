import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asCollection } from '@proto.ui/hooks';
import { useOpenState } from '../tools';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY } from './shared';
import type { DropdownRootAsHookContract, DropdownRootExposes, DropdownRootProps } from './types';

function setupDropdownRoot(def: DefHandle<DropdownRootProps, DropdownRootExposes>): void {
  def.anatomy.claim(DROPDOWN_FAMILY, { role: 'root' });
  asCollection({ family: DROPDOWN_FAMILY });

  def.props.define({
    open: { type: 'boolean', empty: 'fallback' },
    defaultOpen: { type: 'boolean', empty: 'fallback' },
    disabled: { type: 'boolean', empty: 'fallback' },
    closeOnItemCommit: { type: 'boolean', empty: 'fallback' },
    openEntry: { type: 'string', empty: 'fallback' },
    openEntryValue: { type: 'string', empty: 'fallback' },
  });
  def.props.setDefaults({
    defaultOpen: false,
    disabled: false,
    closeOnItemCommit: true,
    openEntry: 'active-or-first',
    openEntryValue: '',
  });

  const updateContext = def.context.provide(DROPDOWN_CONTEXT, {
    open: false,
    controlled: false,
    disabled: false,
    activeValue: '',
    suppressItemNavigation: false,
    closeOnItemCommit: true,
    openEntry: 'active-or-first',
    openEntryValue: '',
  });
  const openState = useOpenState();
  const open = openState.getState?.('open');
  const activeValue = def.state.string('activeValue', '');
  let controlled = false;
  let disabled = false;
  let closeOnItemCommit = true;
  let openEntry: DropdownRootProps['openEntry'] = 'active-or-first';
  let openEntryValue = '';

  const syncContext = () => {
    updateContext((prev) => ({
      ...prev,
      open: open?.get() ?? false,
      controlled,
      disabled,
      activeValue: activeValue.get(),
      closeOnItemCommit,
      openEntry: openEntry ?? 'active-or-first',
      openEntryValue,
    }));
  };

  def.context.subscribe(DROPDOWN_CONTEXT, (_run, next) => {
    if (!controlled) {
      open?.set(next.open, 'reason: dropdown context sync => open');
    }
    activeValue.set(next.activeValue ?? '', 'reason: dropdown context sync => activeValue');
  });

  def.lifecycle.onCreated((run) => {
    controlled = run.props.isProvided('open');
    disabled = !!run.props.get().disabled;
    closeOnItemCommit = !!run.props.get().closeOnItemCommit;
    openEntry = (run.props.get().openEntry as DropdownRootProps['openEntry']) ?? 'active-or-first';
    openEntryValue = run.props.get().openEntryValue ?? '';
    syncContext();
  });

  def.props.watch(
    ['open', 'disabled', 'closeOnItemCommit', 'openEntry', 'openEntryValue'],
    (run, next) => {
      controlled = run.props.isProvided('open');
      disabled = !!next.disabled;
      closeOnItemCommit = !!next.closeOnItemCommit;
      openEntry = (next.openEntry as DropdownRootProps['openEntry']) ?? 'active-or-first';
      openEntryValue = next.openEntryValue ?? '';
      syncContext();
    }
  );

  open?.watch((_run, event) => {
    if (event.type !== 'next') return;
    if (!event.next) {
      activeValue.set('', 'reason: dropdown closed => reset activeValue');
    }
    syncContext();
  });
}

export const asDropdownRoot = defineAsHook<
  DropdownRootProps,
  DropdownRootExposes,
  DropdownRootAsHookContract
>({
  name: 'as-dropdown-root',
  mode: 'once',
  setup: setupDropdownRoot,
});

const dropdownRoot = definePrototype({
  name: 'base-dropdown-root',
  setup: setupDropdownRoot,
});

export default dropdownRoot;
