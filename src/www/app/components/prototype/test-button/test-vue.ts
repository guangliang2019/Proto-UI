import { definePrototype } from '@/core';
import VueAdapter from '@/core/adapters/web/@next-vue';
import {
  ButtonState,
  ButtonExposes,
  ButtonProps,
  DEFAULT_BUTTON_PROPS,
} from '@/core/behaviors/as-button';
import { defineComponent, h, ref, onMounted } from 'vue';
import { ShadcnButtonProps } from '@/components/shadcn/button/interface';
import { optimizeTailwindClasses } from '@/www/utils/tailwind';
import { CONFIG } from '@/components/shadcn/_config';

import { PrototypeAPI } from '@/core/interface';
// 定义组件的 props 接口
interface TestVueProps {
  value?: string;
  name?: string;
}

/**
 * 让使用了 asButton 的组件具有按钮的行为
 * @param p 原型 API
 */
const asButton = <
  Props extends ButtonProps = ButtonProps,
  Exposes extends ButtonExposes = ButtonExposes,
>(
  p: PrototypeAPI<Props, Exposes>
): {
  states: ButtonState;
} => {
  // 状态管理
  const hover = p.state.define<boolean>(false, 'data-hover');
  const focus = p.state.define<boolean>(false, 'data-focus');
  const focusVisible = p.state.define<boolean>(false, 'data-focus-visible');
  const active = p.state.define<boolean>(false, 'data-active');

  // props
  p.props.define(DEFAULT_BUTTON_PROPS as Props);

  const handleDisabledChange = (disabled: boolean) => {
    if (disabled) {
      p.event.focus.setPriority(-1);
      p.event.setAttribute('aria-disabled', 'true');
    } else {
      p.event.focus.setPriority(0);
      p.event.removeAttribute('aria-disabled');
    }
  };

  // 初始属性处理
  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    handleDisabledChange(props.disabled ?? false);

    // 自动聚焦
    if (props.autoFocus) {
      p.event.focus.set(true);
    }
  });

  // 属性同步
  p.props.watch(['disabled'], ({ disabled }) => {
    handleDisabledChange(disabled ?? false);
  });

  // 注册事件监听
  // 鼠标悬停
  p.event.on('mouseenter', () => {
    hover.set(true);
  });
  p.event.on('mouseleave', () => hover.set(false));
  // 鼠标按下
  p.event.on('mousedown', () => active.set(true));
  // 鼠标释放
  p.event.on('mouseup', () => active.set(false));
  // 聚焦
  p.event.on('focus', () => {
    focus.set(true);
    focusVisible.set(active.value);
  });
  p.event.on('blur', () => {
    focus.set(false);
    focusVisible.set(false);
  });
  // 点击
  p.event.on('click', (e) => {
    const props = p.props.get();
    if (!focus.value || props.disabled) return;
    props.onClick?.(e as MouseEvent);
  });
  // 键盘按下
  p.event.on('keydown', (e) => {
    const props = p.props.get();
    if (!focus.value || props.disabled) return;
    const event = e as KeyboardEvent;
    if (event.key === 'Enter' || event.key === ' ') {
      props.onClick?.(event);
    }
  });

  return {
    states: {
      hover,
      focus,
      focusVisible,
      active,
    },
  };
};

const PrototypeButton = definePrototype<ShadcnButtonProps, ButtonExposes>({
  name: `vue-button`,
  setup: (p) => {
    // role
    asButton(p);

    // props
    p.props.define({ variant: 'secondary', iconOnly: false });
    p.props.watch(['variant'], () => {
      p.view.update();
    });

    // handle class names
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      const { iconOnly, disabled, variant } = p.props.get();
      let basicCls = 'select-none whitespace-nowrap';
      let flexCls = 'inline-flex items-center justify-center gap-2';
      let shapeCls = 'rounded-md';
      let sizeCls = iconOnly ? 'h-9 w-9' : 'h-9 px-4 py-2';
      let cursorCls = disabled ? 'cursor-arrow' : 'cursor-pointer';
      let fontCls = 'text-sm font-medium';
      let animationCls = 'transition-colors';
      let disabledCls = 'disabled:pointer-events-none disabled:opacity-50';
      let focusCls = 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';
      let shadowCls = 'shadow-sm';
      let colorCls = 'bg-secondary text-secondary-foreground  hover:bg-secondary/80';
      let borderCls = '';
      let extraCls = '';
      switch (variant) {
        case 'primary':
          colorCls = 'bg-primary text-primary-foreground hover:bg-primary/90';
          shadowCls = 'shadow-lg';
          break;
        case 'secondary':
          break;
        case 'outline':
          colorCls = 'bg-background hover:bg-accent hover:text-accent-foreground';
          borderCls = 'border border-input';
          break;
        case 'destructive':
          colorCls = 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
          break;
        case 'ghost':
          colorCls = 'hover:bg-accent hover:text-accent-foreground';
          break;
        case 'link':
          extraCls = 'text-primary underline-offset-4 hover:underline';
          colorCls = '';
          break;
      }
      const _computedClass = [
        basicCls,
        flexCls,
        shapeCls,
        sizeCls,
        cursorCls,
        fontCls,
        animationCls,
        disabledCls,
        focusCls,
        shadowCls,
        colorCls,
        borderCls,
        extraCls,
      ]
        .join(' ')
        .trimEnd();
      p.view.getElement().className = optimizeTailwindClasses(
        [_computedClass, _originalCls].join(' ').trimEnd()
      );
    };
  },
});
const vueButton = VueAdapter(PrototypeButton);

const TestVueComponent = defineComponent({
  setup() {
    // 测试生命周期
    onMounted(() => {
    });
    // TODO: 这里 hadcnTabs 的 defaultValue: 'account' 部分没有生效 ，是 props.define 实现有问题
    return () =>
      h('div', { class: 'space-y-4 p-4' }, [

        h(ShadcnTabs, { defaultValue: 'account', Test:'test' }, [
          h(ShadcnTabsList, [
            h(ShadcnTabsTrigger, { value: 'account1' }, ['Account']),
            h(ShadcnTabsTrigger, { value: 'password23' }, ['Password']),
          ]),
          h(ShadcnTabsContent, { value: 'account1' }, [
            h('div', { class: 'rounded-xl border bg-card text-card-foreground shadow mt-2' }, [
              h('div', { class: 'flex flex-col space-y-1.5 p-6' }, [
                h('h3', { class: 'font-semibold leading-none tracking-tight' }, ['Account']),
                h('p', { class: 'text-sm text-muted-foreground' }, [
                  "Make changes to your account here. Click save when you're done.",
                ]),
              ]),
            ]),
          ]),
          // h(ShadcnTabsContent, { value: 'password2' }, [
          //   h('div', { class: 'rounded-xl border bg-card text-card-foreground shadow mt-2' }, [
          //     h('div', { class: 'flex flex-col space-y-1.5 p-6' }, [
          //       h('h3', { class: 'font-semibold leading-none tracking-tight' }, ['Password']),
          //       h('p', { class: 'text-sm text-muted-foreground' }, [
          //         "Change your password here. After saving, you'll be logged out.",
          //       ]),
          //     ]),
          //   ]),
          // ]),
        ]),
      ]);
  },
});

export default TestVueComponent;

import { asTabs } from '@/core/behaviors/as-tabs';
import { TabsProps, TabsExposes } from '@/core/behaviors/as-tabs';
const ShadcnTabsPrototype = definePrototype<TabsProps, TabsExposes>({
  name: `${CONFIG.shadcn.prefix}-tabs`,
  setup: (p) => {

    asTabs(p);
    p.lifecycle.onMounted(() => {
    });
  },
});

const ShadcnTabs = VueAdapter(ShadcnTabsPrototype);

import { asTabsTrigger, TabsTriggerProps } from '@/core/behaviors/as-tabs';

const ShadcnTabsTriggerPrototype = definePrototype<TabsTriggerProps>({
  name: `${CONFIG.shadcn.prefix}-tabs-trigger`,
  setup: (p) => {
    asTabsTrigger(p);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      const _computedClass =
        'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow';
      p.view.getElement().className = [_computedClass, _originalCls].join(' ').trimEnd();
    };
  },
});

const ShadcnTabsTrigger = VueAdapter(ShadcnTabsTriggerPrototype);

import { TabsContext } from '@/core/behaviors/as-tabs';

const ShadcnTabsListPrototype = definePrototype({
  name: `${CONFIG.shadcn.prefix}-tabs-list`,
  setup: (p) => {
    p.context.watch(TabsContext);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      const _computedClass =
        'h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2';
      p.view.getElement().className = [_computedClass, _originalCls].join(' ').trimEnd();
    };
  },
});

const ShadcnTabsList = VueAdapter(ShadcnTabsListPrototype);

import { asTabsContent, TabsContentProps } from '@/core/behaviors/as-tabs';

const ShadcnTabsContentPrototype = definePrototype<TabsContentProps>({
  name: `${CONFIG.shadcn.prefix}-tabs-content`,
  setup: (p) => {
    asTabsContent(p);

    // get original class
    let _originalCls = '';
    p.lifecycle.onMounted(() => {
      _originalCls = p.view.getElement().className;
    });

    return () => {
      p.view.getElement().className = [_originalCls, 'data-[state=inactive]:hidden']
        .join(' ')
        .trimEnd();
    };
  },
});

const ShadcnTabsContent = VueAdapter(ShadcnTabsContentPrototype);


