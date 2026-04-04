export type {
  TabsRootProps,
  TabsRootExposes,
  TabsRootStateHandles,
  TabsRootAsHookContract,
  TabsListProps,
  TabsListExposes,
  TabsListAsHookContract,
  TabsTriggerProps,
  TabsTriggerExposes,
  TabsTriggerStateHandles,
  TabsTriggerAsHookContract,
  TabsContentProps,
  TabsContentExposes,
  TabsContentStateHandles,
  TabsContentAsHookContract,
} from './types';
export type { TabsActivationMode, TabsContextValue, TabsOrientation } from './shared';

export { TABS_CONTEXT, TABS_FAMILY } from './shared';
export { asTabsRoot, default as tabsRoot } from './root';
export { asTabsList, default as tabsList } from './list';
export { asTabsTrigger, default as tabsTrigger } from './trigger';
export { asTabsContent, default as tabsContent } from './content';
