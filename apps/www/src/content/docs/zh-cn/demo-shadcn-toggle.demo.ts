export default {
  type: 'demo',
  root: {
    kind: 'box',
    className: 'flex flex-wrap items-center gap-3',
    children: [
      { kind: 'proto', prototypeId: 'shadcn-toggle', children: ['Bold'] },
      {
        kind: 'proto',
        prototypeId: 'shadcn-toggle',
        props: { variant: 'outline', defaultChecked: true },
        children: ['Italic'],
      },
      {
        kind: 'proto',
        prototypeId: 'shadcn-toggle',
        props: { size: 'sm' },
        children: ['Underline'],
      },
      {
        kind: 'proto',
        prototypeId: 'shadcn-toggle',
        props: { disabled: true, defaultChecked: true },
        children: ['Disabled'],
      },
    ],
  },
};
