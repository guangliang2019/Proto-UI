export default {
  type: 'demo',
  root: {
    kind: 'box',
    className: 'border rounded flex gap-4',
    children: [
      {
        kind: 'box',
        className: 'rounded',
        children: [
          {
            kind: 'proto',
            prototypeId: 'demo-inline',
            className: 'rounded',
            props: { label: 'Second' },
            children: ['Vue Button'],
          },
          {
            kind: 'text',
            text: 'Hello',
          },
        ],
      },
      {
        kind: 'box',
        className: 'flex',
        children: [
          {
            kind: 'proto',
            prototypeId: 'demo-inline',
            className: 'rounded',
            props: { label: 'Second' },
            children: ['Second Button'],
          },
        ],
      },
    ],
  },
};
