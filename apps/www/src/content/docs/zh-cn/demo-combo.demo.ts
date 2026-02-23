export default {
  type: 'demo',
  root: {
    kind: 'box',
    className: 'border rounded flex gap-4',
    children: [
      {
        kind: 'proto',
        prototypeId: 'demo-inline',
        className: 'rounded',
        props: { label: 'First' },
        children: [
          'First Button',
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
            children: [
             'Second Button',
            ],
          },
        ],
      },
    ],
  },
};
