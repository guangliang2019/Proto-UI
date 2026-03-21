import tabsContent from './content';
import tabsList from './list';
import tabsRoot from './root';
import tabsTrigger from './trigger';

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
export { asTabsRoot } from './as-tabs-root';
export { asTabsList } from './as-tabs-list';
export { asTabsTrigger } from './as-tabs-trigger';
export { asTabsContent } from './as-tabs-content';
export { tabsRoot, tabsList, tabsTrigger, tabsContent };
