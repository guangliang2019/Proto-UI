export default {
  type: 'demo',
  root: {
    kind: 'proto',
    prototypeId: 'base-hover-card-root',
    className: 'relative inline-flex items-start',
    children: [
      {
        kind: 'proto',
        prototypeId: 'base-hover-card-trigger',
        className: 'rounded border px-3 py-1.5',
        children: ['Hover me'],
      },
      {
        kind: 'proto',
        prototypeId: 'base-hover-card-content',
        className: 'mt-3 w-72 rounded border bg-white p-3 shadow',
        children: [
          'Base hover-card content. Move pointer between trigger and content to keep it open.',
        ],
      },
    ],
  },
};
