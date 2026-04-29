function defineSimple(id, label, packageName, prototypeImport, exportBaseName, options = {}) {
  return {
    id,
    label,
    packageName,
    stylePreset: options.stylePreset ?? null,
    items: [
      createItem({
        prototypeImport,
        exportBaseName,
        elementName: options.elementName ?? `proto-ui-${id}`,
      }),
    ],
  };
}

function defineCompound(id, label, packageName, parts, options = {}) {
  return {
    id,
    label,
    packageName,
    stylePreset: options.stylePreset ?? null,
    items: parts.map((part) =>
      createItem({
        prototypeImport: part.prototypeImport,
        exportBaseName: part.exportBaseName,
        elementName: part.elementName,
      })
    ),
  };
}

function createItem({ prototypeImport, exportBaseName, elementName }) {
  return {
    prototypeImport,
    reactExport: exportBaseName,
    vueExport: exportBaseName,
    wcExport: `${exportBaseName}Element`,
    elementName,
  };
}

const shadcn = (id, label, prototypeImport, exportBaseName) =>
  defineSimple(id, label, '@proto.ui/prototypes-shadcn', prototypeImport, exportBaseName, {
    stylePreset: 'shadcn',
  });

const shadcnCompound = (id, label, parts) =>
  defineCompound(id, label, '@proto.ui/prototypes-shadcn', parts, {
    stylePreset: 'shadcn',
  });

const base = (id, label, prototypeImport, exportBaseName) =>
  defineSimple(id, label, '@proto.ui/prototypes-base', prototypeImport, exportBaseName);

const baseCompound = (id, label, parts) =>
  defineCompound(id, label, '@proto.ui/prototypes-base', parts);

export const COMPONENT_REGISTRY = {
  'shadcn-button': shadcn('shadcn-button', 'shadcn Button', 'shadcnButton', 'Button'),
  'shadcn-toggle': shadcn('shadcn-toggle', 'shadcn Toggle', 'shadcnToggle', 'Toggle'),

  'shadcn-switch': shadcnCompound('shadcn-switch', 'shadcn Switch', [
    {
      prototypeImport: 'shadcnSwitchRoot',
      exportBaseName: 'SwitchRoot',
      elementName: 'proto-ui-shadcn-switch-root',
    },
    {
      prototypeImport: 'shadcnSwitchThumb',
      exportBaseName: 'SwitchThumb',
      elementName: 'proto-ui-shadcn-switch-thumb',
    },
  ]),

  'shadcn-tabs': shadcnCompound('shadcn-tabs', 'shadcn Tabs', [
    {
      prototypeImport: 'shadcnTabsRoot',
      exportBaseName: 'TabsRoot',
      elementName: 'proto-ui-shadcn-tabs-root',
    },
    {
      prototypeImport: 'shadcnTabsList',
      exportBaseName: 'TabsList',
      elementName: 'proto-ui-shadcn-tabs-list',
    },
    {
      prototypeImport: 'shadcnTabsTrigger',
      exportBaseName: 'TabsTrigger',
      elementName: 'proto-ui-shadcn-tabs-trigger',
    },
    {
      prototypeImport: 'shadcnTabsContent',
      exportBaseName: 'TabsContent',
      elementName: 'proto-ui-shadcn-tabs-content',
    },
  ]),

  'shadcn-hover-card': shadcnCompound('shadcn-hover-card', 'shadcn Hover Card', [
    {
      prototypeImport: 'shadcnHoverCardRoot',
      exportBaseName: 'HoverCardRoot',
      elementName: 'proto-ui-shadcn-hover-card-root',
    },
    {
      prototypeImport: 'shadcnHoverCardTrigger',
      exportBaseName: 'HoverCardTrigger',
      elementName: 'proto-ui-shadcn-hover-card-trigger',
    },
    {
      prototypeImport: 'shadcnHoverCardContent',
      exportBaseName: 'HoverCardContent',
      elementName: 'proto-ui-shadcn-hover-card-content',
    },
  ]),

  'shadcn-dropdown': shadcnCompound('shadcn-dropdown', 'shadcn Dropdown', [
    {
      prototypeImport: 'shadcnDropdownRoot',
      exportBaseName: 'DropdownRoot',
      elementName: 'proto-ui-shadcn-dropdown-root',
    },
    {
      prototypeImport: 'shadcnDropdownTrigger',
      exportBaseName: 'DropdownTrigger',
      elementName: 'proto-ui-shadcn-dropdown-trigger',
    },
    {
      prototypeImport: 'shadcnDropdownContent',
      exportBaseName: 'DropdownContent',
      elementName: 'proto-ui-shadcn-dropdown-content',
    },
    {
      prototypeImport: 'shadcnDropdownItem',
      exportBaseName: 'DropdownItem',
      elementName: 'proto-ui-shadcn-dropdown-item',
    },
  ]),

  'shadcn-dialog': shadcnCompound('shadcn-dialog', 'shadcn Dialog', [
    {
      prototypeImport: 'shadcnDialogRoot',
      exportBaseName: 'DialogRoot',
      elementName: 'proto-ui-shadcn-dialog-root',
    },
    {
      prototypeImport: 'shadcnDialogTrigger',
      exportBaseName: 'DialogTrigger',
      elementName: 'proto-ui-shadcn-dialog-trigger',
    },
    {
      prototypeImport: 'shadcnDialogMask',
      exportBaseName: 'DialogMask',
      elementName: 'proto-ui-shadcn-dialog-mask',
    },
    {
      prototypeImport: 'shadcnDialogContent',
      exportBaseName: 'DialogContent',
      elementName: 'proto-ui-shadcn-dialog-content',
    },
    {
      prototypeImport: 'shadcnDialogTitle',
      exportBaseName: 'DialogTitle',
      elementName: 'proto-ui-shadcn-dialog-title',
    },
    {
      prototypeImport: 'shadcnDialogDescription',
      exportBaseName: 'DialogDescription',
      elementName: 'proto-ui-shadcn-dialog-description',
    },
    {
      prototypeImport: 'shadcnDialogClose',
      exportBaseName: 'DialogClose',
      elementName: 'proto-ui-shadcn-dialog-close',
    },
  ]),

  'base-button': base('base-button', 'base Button', 'button', 'BaseButton'),
  'base-toggle': base('base-toggle', 'base Toggle', 'toggle', 'BaseToggle'),
  'base-transition': base('base-transition', 'base Transition', 'transition', 'BaseTransition'),

  'base-switch': baseCompound('base-switch', 'base Switch', [
    {
      prototypeImport: 'switchRoot',
      exportBaseName: 'BaseSwitchRoot',
      elementName: 'proto-ui-base-switch-root',
    },
    {
      prototypeImport: 'switchThumb',
      exportBaseName: 'BaseSwitchThumb',
      elementName: 'proto-ui-base-switch-thumb',
    },
  ]),

  'base-tabs': baseCompound('base-tabs', 'base Tabs', [
    {
      prototypeImport: 'tabsRoot',
      exportBaseName: 'BaseTabsRoot',
      elementName: 'proto-ui-base-tabs-root',
    },
    {
      prototypeImport: 'tabsList',
      exportBaseName: 'BaseTabsList',
      elementName: 'proto-ui-base-tabs-list',
    },
    {
      prototypeImport: 'tabsTrigger',
      exportBaseName: 'BaseTabsTrigger',
      elementName: 'proto-ui-base-tabs-trigger',
    },
    {
      prototypeImport: 'tabsContent',
      exportBaseName: 'BaseTabsContent',
      elementName: 'proto-ui-base-tabs-content',
    },
  ]),

  'base-dropdown': baseCompound('base-dropdown', 'base Dropdown', [
    {
      prototypeImport: 'dropdownRoot',
      exportBaseName: 'BaseDropdownRoot',
      elementName: 'proto-ui-base-dropdown-root',
    },
    {
      prototypeImport: 'dropdownTrigger',
      exportBaseName: 'BaseDropdownTrigger',
      elementName: 'proto-ui-base-dropdown-trigger',
    },
    {
      prototypeImport: 'dropdownContent',
      exportBaseName: 'BaseDropdownContent',
      elementName: 'proto-ui-base-dropdown-content',
    },
    {
      prototypeImport: 'dropdownItem',
      exportBaseName: 'BaseDropdownItem',
      elementName: 'proto-ui-base-dropdown-item',
    },
  ]),

  'base-select': baseCompound('base-select', 'base Select', [
    {
      prototypeImport: 'selectRoot',
      exportBaseName: 'BaseSelectRoot',
      elementName: 'proto-ui-base-select-root',
    },
    {
      prototypeImport: 'selectTrigger',
      exportBaseName: 'BaseSelectTrigger',
      elementName: 'proto-ui-base-select-trigger',
    },
    {
      prototypeImport: 'selectValue',
      exportBaseName: 'BaseSelectValue',
      elementName: 'proto-ui-base-select-value',
    },
    {
      prototypeImport: 'selectContent',
      exportBaseName: 'BaseSelectContent',
      elementName: 'proto-ui-base-select-content',
    },
    {
      prototypeImport: 'selectItem',
      exportBaseName: 'BaseSelectItem',
      elementName: 'proto-ui-base-select-item',
    },
  ]),

  'base-hover-card': baseCompound('base-hover-card', 'base Hover Card', [
    {
      prototypeImport: 'hoverCardRoot',
      exportBaseName: 'BaseHoverCardRoot',
      elementName: 'proto-ui-base-hover-card-root',
    },
    {
      prototypeImport: 'hoverCardTrigger',
      exportBaseName: 'BaseHoverCardTrigger',
      elementName: 'proto-ui-base-hover-card-trigger',
    },
    {
      prototypeImport: 'hoverCardContent',
      exportBaseName: 'BaseHoverCardContent',
      elementName: 'proto-ui-base-hover-card-content',
    },
  ]),

  'base-dialog': baseCompound('base-dialog', 'base Dialog', [
    {
      prototypeImport: 'dialogRoot',
      exportBaseName: 'BaseDialogRoot',
      elementName: 'proto-ui-base-dialog-root',
    },
    {
      prototypeImport: 'dialogTrigger',
      exportBaseName: 'BaseDialogTrigger',
      elementName: 'proto-ui-base-dialog-trigger',
    },
    {
      prototypeImport: 'dialogMask',
      exportBaseName: 'BaseDialogMask',
      elementName: 'proto-ui-base-dialog-mask',
    },
    {
      prototypeImport: 'dialogContent',
      exportBaseName: 'BaseDialogContent',
      elementName: 'proto-ui-base-dialog-content',
    },
    {
      prototypeImport: 'dialogTitle',
      exportBaseName: 'BaseDialogTitle',
      elementName: 'proto-ui-base-dialog-title',
    },
    {
      prototypeImport: 'dialogDescription',
      exportBaseName: 'BaseDialogDescription',
      elementName: 'proto-ui-base-dialog-description',
    },
    {
      prototypeImport: 'dialogClose',
      exportBaseName: 'BaseDialogClose',
      elementName: 'proto-ui-base-dialog-close',
    },
  ]),
};

export function getComponentEntry(componentId) {
  return COMPONENT_REGISTRY[componentId] ?? null;
}

export function listComponentChoices() {
  return Object.values(COMPONENT_REGISTRY)
    .map((entry) => ({
      title: entry.label,
      value: entry.id,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
