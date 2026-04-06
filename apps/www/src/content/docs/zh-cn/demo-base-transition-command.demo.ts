import type { DemoSetupContext } from '@/components/PrototypePreviewer/demo-types';

export default {
  type: 'demo',
  setup({ host, refs, api }: DemoSetupContext) {
    const enterBtn = refs.enterBtn;
    const leaveBtn = refs.leaveBtn;
    const completeBtn = refs.completeBtn;
    const label = refs.stateLabel;
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
    mo.observe(host, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-transition-state'],
    });

    const onEnter = () => api.call('transition', 'controls.enter');
    const onLeave = () => api.call('transition', 'controls.leave');
    const onComplete = () => api.call('transition', 'controls.complete');

    enterBtn?.addEventListener('click', onEnter);
    leaveBtn?.addEventListener('click', onLeave);
    completeBtn?.addEventListener('click', onComplete);

    return () => {
      mo.disconnect();
      enterBtn?.removeEventListener('click', onEnter);
      leaveBtn?.removeEventListener('click', onLeave);
      completeBtn?.removeEventListener('click', onComplete);
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
          open: true,
          appear: true,
        },
        className: 'transition-wrapper',
        children: [
          {
            kind: 'box',
            className:
              'w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box',
            children: [
              {
                kind: 'box',
                className: 'text-lg font-semibold',
                children: ['Animated Box'],
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
            ref: 'enterBtn',
            className:
              'px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer select-none',
            children: ['Enter'],
          },
          {
            kind: 'box',
            ref: 'leaveBtn',
            className:
              'px-3 py-1.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer select-none',
            children: ['Leave'],
          },
          {
            kind: 'box',
            ref: 'completeBtn',
            className:
              'px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md cursor-pointer select-none',
            children: ['Complete'],
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
