import { asCollectionItem, asFocusable, defineAsHook } from '@proto.ui/core';
import { asButton } from '../button/as-button';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY, DROPDOWN_FOCUS_GROUP } from './shared';
import type { DropdownItemAsHookContract, DropdownItemExposes, DropdownItemProps } from './types';

export const asDropdownItem = defineAsHook<
  DropdownItemProps,
  DropdownItemExposes,
  DropdownItemAsHookContract
>({
  name: 'as-dropdown-item',
  mode: 'once',
  setup(def) {
    asButton();
    const focusable = asFocusable({ groupKey: DROPDOWN_FOCUS_GROUP });
    const active = def.state.bool('active', false);
    asCollectionItem({
      family: DROPDOWN_FAMILY,
      getMeta: (run) => {
        const props = run.props.get();
        return {
          value: props.value ?? '',
          textValue: props.textValue ?? '',
          disabled: !!props.disabled,
        };
      },
    });

    def.props.define({
      disabled: { type: 'boolean', empty: 'fallback' },
      value: { type: 'string', empty: 'fallback' },
      textValue: { type: 'string', empty: 'fallback' },
      closeOnCommit: { type: 'boolean', empty: 'fallback' },
    });
    def.props.setDefaults({
      disabled: false,
      value: '',
      textValue: '',
    });

    const syncActive = (ctx: { activeValue?: string }, ownValue: string) => {
      active.set(
        !!ownValue && ownValue === (ctx.activeValue ?? ''),
        'reason: dropdown active sync'
      );
    };

    def.expose.state('active', active);
    def.context.subscribe(DROPDOWN_CONTEXT, (run, next) => {
      syncActive(next, run.props.get().value ?? '');
    });

    def.lifecycle.onMounted((run) => {
      syncActive(run.context.read(DROPDOWN_CONTEXT), run.props.get().value ?? '');
    });
    def.props.watch(['value'], (run, next) => {
      syncActive(run.context.read(DROPDOWN_CONTEXT), next.value ?? '');
    });

    const updateActiveValue = (run: any) => {
      const ownValue = run.props.get().value ?? '';
      if (!ownValue) return;
      run.context.update(DROPDOWN_CONTEXT, (prev: any) => {
        if (prev.activeValue === ownValue) return prev;
        return { ...prev, activeValue: ownValue };
      });
    };

    def.event.on('press.commit', (run) => {
      const ownDisabled = !!run.props.get().disabled;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (ownDisabled || ctx.disabled) return;
      updateActiveValue(run);
      if (ctx.controlled) return;
      const closeOnCommit = run.props.isProvided('closeOnCommit')
        ? !!run.props.get().closeOnCommit
        : !!ctx.closeOnItemCommit;
      if (!closeOnCommit) return;
      run.context.update(DROPDOWN_CONTEXT, (prev: any) => ({
        ...prev,
        open: false,
        activeValue: '',
        suppressItemNavigation: false,
      }));
    });

    def.event.on('native:focus', (run) => {
      const ownDisabled = !!run.props.get().disabled;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (ownDisabled || ctx.disabled) return;
      updateActiveValue(run);
    });
    def.event.on('pointer.enter', (run) => {
      const ownDisabled = !!run.props.get().disabled;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (ownDisabled || ctx.disabled || !ctx.open) return;
      updateActiveValue(run);
    });

    def.event.onGlobal('key.down', (run, ev) => {
      const ownDisabled = !!run.props.get().disabled;
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      if (ownDisabled || ctx.disabled) return;
      if (!focusable.isFocused()) return;
      if (ctx.suppressItemNavigation) {
        run.context.update(DROPDOWN_CONTEXT, (prev: any) => ({
          ...prev,
          suppressItemNavigation: false,
        }));
        return;
      }

      const key = ev?.detail?.key;
      const content = run.anatomy.partsOf(DROPDOWN_FAMILY, 'content')[0] ?? null;
      const focusFirst = content?.getExpose('focusFirst') as (() => void) | null;
      const focusLast = content?.getExpose('focusLast') as (() => void) | null;
      const focusNext = content?.getExpose('focusNext') as (() => void) | null;
      const focusPrev = content?.getExpose('focusPrev') as (() => void) | null;

      if (key === 'Home') {
        queueMicrotask(() => {
          focusFirst?.();
        });
        return;
      }
      if (key === 'End') {
        queueMicrotask(() => {
          focusLast?.();
        });
        return;
      }
      if (key === 'ArrowDown') {
        queueMicrotask(() => {
          focusNext?.();
        });
        return;
      }
      if (key === 'ArrowUp') {
        queueMicrotask(() => {
          focusPrev?.();
        });
      }
    });
  },
});
