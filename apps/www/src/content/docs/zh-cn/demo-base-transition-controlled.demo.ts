import type { DemoSetupContext } from '@/components/PrototypePreviewer/demo-types';

export default {
  type: 'demo',
  setup({ refs, api }: DemoSetupContext) {
    const toggleBtn = refs.toggleBtn;
    const label = refs.stateLabel;
    const box = refs.box;
    if (!label) return;

    const getTransitionState = () =>
      (
        api.getExposes('transition')?.transitionState as { get?: () => string } | undefined
      )?.get?.();

    const readState = () => {
      const s = getTransitionState();
      label.textContent = typeof s === 'string' ? s : 'unknown';
    };

    readState();
    const mo = new MutationObserver(readState);
    const el = refs.transition;
    if (el) mo.observe(el, { attributes: true, attributeFilter: ['data-transition-state'] });

    const toggleOpen = () => {
      const state = getTransitionState();
      const isOpen = state === 'entered' || state === 'entering';
      api.setProps('transition', { open: !isOpen });
    };

    const onBoxClick = (e: Event) => {
      if ((e.target as HTMLElement).closest('.transition-box')) {
        toggleOpen();
      }
    };

    toggleBtn?.addEventListener('click', toggleOpen);
    box?.addEventListener('click', onBoxClick);

    // Demo 宿主在 CSS 过渡结束后自动调用 complete 以推进状态机
    const inner = box?.querySelector('.transition-box') ?? box;
    const onTransitionEnd = () => {
      const state = getTransitionState();
      if (state === 'entering' || state === 'leaving') {
        api.call('transition', 'controls.complete');
      }
    };
    inner?.addEventListener('transitionend', onTransitionEnd);

    return () => {
      mo.disconnect();
      toggleBtn?.removeEventListener('click', toggleOpen);
      box?.removeEventListener('click', onBoxClick);
      inner?.removeEventListener('transitionend', onTransitionEnd);
    };
  },
  root: {
    kind: 'box',
    className: 'flex flex-col items-center gap-6 p-8',
    children: [
      {
        kind: 'proto',
        prototypeId: 'base-transition',
        ref: 'transition',
        props: {
          open: false,
          appear: false,
        },
        className: 'transition-wrapper',
        children: [
          {
            kind: 'box',
            ref: 'box',
            className:
              'w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none',
            children: [
              {
                kind: 'box',
                className: 'text-lg font-semibold',
                children: ['Click Me'],
              },
            ],
          },
        ],
      },
      {
        kind: 'box',
        className: 'flex flex-wrap items-center justify-center gap-2',
        children: [
          {
            kind: 'box',
            ref: 'toggleBtn',
            className:
              'px-3 py-1.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 rounded-md cursor-pointer select-none',
            children: ['Toggle Open'],
          },
        ],
      },
      {
        kind: 'box',
        className: 'text-sm text-slate-500',
        children: [
          'State: ',
          {
            kind: 'box',
            ref: 'stateLabel',
            className: 'inline text-slate-800 font-semibold',
            children: ['—'],
          },
        ],
      },
      {
        kind: 'box',
        className: 'flex gap-4 text-xs',
        children: [
          {
            kind: 'box',
            className: 'px-3 py-1 bg-gray-200 rounded',
            children: ['closed'],
          },
          {
            kind: 'box',
            className: 'px-3 py-1 bg-blue-200 rounded',
            children: ['entering'],
          },
          {
            kind: 'box',
            className: 'px-3 py-1 bg-green-200 rounded',
            children: ['entered'],
          },
          {
            kind: 'box',
            className: 'px-3 py-1 bg-orange-200 rounded',
            children: ['leaving'],
          },
        ],
      },
    ],
  },
};
