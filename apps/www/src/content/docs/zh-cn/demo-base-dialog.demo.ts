export default {
  type: 'demo',
  root: {
    kind: 'proto',
    prototypeId: 'base-dialog-root',
    className: 'relative inline-block',
    children: [
      {
        kind: 'proto',
        prototypeId: 'base-dialog-trigger',
        className: 'rounded border px-3 py-1.5 cursor-pointer select-none',
        children: ['Open Dialog'],
      },
      {
        kind: 'proto',
        prototypeId: 'base-dialog-overlay',
        className: 'bg-black/50',
      },
      {
        kind: 'proto',
        prototypeId: 'base-dialog-content',
        className: 'w-full max-w-md rounded-lg border bg-white p-6 shadow-xl',
        children: [
          {
            kind: 'proto',
            prototypeId: 'base-dialog-title',
            className: 'text-lg font-semibold mb-2',
            children: ['Confirm Action'],
          },
          {
            kind: 'proto',
            prototypeId: 'base-dialog-description',
            className: 'text-sm text-slate-600 mb-6',
            children: ['Are you sure you want to proceed? This action cannot be undone.'],
          },
          {
            kind: 'box',
            className: 'flex gap-3 justify-end',
            children: [
              {
                kind: 'proto',
                prototypeId: 'base-dialog-close',
                className:
                  'px-4 py-2 text-sm font-medium rounded border cursor-pointer select-none',
                children: ['Cancel'],
              },
              {
                kind: 'proto',
                prototypeId: 'base-dialog-close',
                className:
                  'px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white cursor-pointer select-none',
                children: ['Confirm'],
              },
            ],
          },
        ],
      },
    ],
  },
};
