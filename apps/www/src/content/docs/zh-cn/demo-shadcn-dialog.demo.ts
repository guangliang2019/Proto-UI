export default {
  type: 'demo',
  root: {
    kind: 'proto',
    prototypeId: 'shadcn-dialog-root',
    children: [
      {
        kind: 'proto',
        prototypeId: 'shadcn-dialog-trigger',
        children: ['Open Dialog'],
      },
      {
        kind: 'proto',
        prototypeId: 'shadcn-dialog-mask',
      },
      {
        kind: 'proto',
        prototypeId: 'shadcn-dialog-content',
        children: [
          {
            kind: 'proto',
            prototypeId: 'shadcn-dialog-title',
            children: ['Edit Profile'],
          },
          {
            kind: 'proto',
            prototypeId: 'shadcn-dialog-description',
            children: ["Make changes to your profile here. Click save when you're done."],
          },
          {
            kind: 'box',
            className: 'flex gap-2 justify-end',
            children: [
              {
                kind: 'proto',
                prototypeId: 'shadcn-dialog-close',
                props: { variant: 'outline' },
                children: ['Cancel'],
              },
              {
                kind: 'proto',
                prototypeId: 'shadcn-dialog-close',
                children: ['Save changes'],
              },
            ],
          },
        ],
      },
    ],
  },
};
