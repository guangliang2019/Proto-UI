export default {
  type: 'demo',
  root: {
    kind: 'proto',
    prototypeId: 'shadcn-hover-card-root',
    className: 'relative inline-flex items-start',
    children: [
      {
        kind: 'proto',
        prototypeId: 'shadcn-hover-card-trigger',
        children: ['@proto-ui'],
      },
      {
        kind: 'proto',
        prototypeId: 'shadcn-hover-card-content',
        className: 'mt-3',
        children: [
          'Build headless protocols once, then skin them per host. This hover-card uses asOverlay for open/close orchestration.',
        ],
      },
    ],
  },
};
