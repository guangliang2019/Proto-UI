import { Context, ContextManager } from '@/core/interface';
import { WebContextCenter } from '@/core/adapters/web/context-center';

interface ContextListener<T> {
  callback: (value: T, changedKeys: string[]) => void;
  context: Context<T>;
}

// 定义 Component 接口
interface Component {
  _contextManager?: VueContextManager;
}

export class VueContextManager implements ContextManager {
  private providedContexts = new Set<Context>();
  private consumedContexts = new Set<Context>();
  private providedValues = new Map<Context, any>();
  private consumedValues = new Map<Context, any>();
  private contextListeners = new Set<ContextListener<any>>();
  private component: Component | undefined;
  private contextCenter: WebContextCenter | undefined;
  
  constructor() {
    // 不再需要 WebContextCenter
  }
  init(component: Component) {
    this.component = component;
    this.contextCenter = WebContextCenter.getInstance();
  }
  
  getProvidedContexts(): Set<Context> {
    return this.providedContexts;
  }

  getConsumedContexts(): Set<Context> {
    return this.consumedContexts;
  }

  provideContext<T>(context: Context<T>, value: T): void {
    this.providedContexts.add(context);
    this.providedValues.set(context, value);
    // 不再需要注册到 ContextCenter
  }

  consumeContext<T>(context: Context<T>, notifyListeners = true): void {
    this.consumedContexts.add(context);
    // 不再需要注册到 ContextCenter

    // 通知监听器
    if (notifyListeners) {
      this.notifyListeners(context, this.consumedValues.get(context), []);
    }
  }

  setConsumedValue<T>(
    context: Context<T>,
    value: T,
    changedKeys: string[],
    notifyListeners = true
  ): void {
    this.consumedValues.set(context, value);
    console.log(this.consumedValues, 'consumedValues');
    // 通知监听器
    if (notifyListeners) {
      this.notifyListeners(context, value, changedKeys);
    }
  }

  setProvidedValue<T>(context: Context<T>, value: T): void {
    this.providedValues.set(context, value);
  }

  getProvidedValue<T>(context: Context<T>): T | undefined {
    return this.providedValues.get(context);
  }

  getConsumedValue<T>(context: Context<T>): T | undefined {
    return this.consumedValues.get(context);
  }

  destroy(): void {
    // 不再需要从 ContextCenter 中移除
    // 清理所有状态
    this.providedContexts.clear();
    this.consumedContexts.clear();
    this.providedValues.clear();
    this.consumedValues.clear();
    this.contextListeners.clear();
  }

  /**
   * 添加 Context 监听器
   * @param context Context 实例
   * @param callback 回调函数
   */
  addContextListener<T>(
    context: Context<T>,
    callback: (value: T, changedKeys: string[]) => void
  ): void {
    this.contextListeners.add({ context, callback });
  }

  /**
   * 移除 Context 监听器
   * @param context Context 实例
   * @param callback 回调函数
   */
  removeContextListener<T>(
    context: Context<T>,
    callback: (value: T, changedKeys: string[]) => void
  ): void {
    this.contextListeners.delete({ context, callback });
  }

  /**
   * 通知所有监听器
   * @param context Context 实例
   * @param value 新的值
   * @param changedKeys 改变的键
   */
  private notifyListeners<T>(context: Context<T>, value: T, changedKeys: string[]): void {
    this.contextListeners.forEach((listener) => {
      if (listener.context === context) {
        listener.callback(value, changedKeys);
      }
    });
  }

  /**
   * 获取 Provider 的所有 Consumer
   * 由于使用 Vue provide/inject，这个方法不再需要
   * 但为了保持接口兼容性，返回空数组
   */
  getConsumers<T>(context: Context<T>): Component[] {
    // 不再需要从 ContextCenter 获取消费者
    // 直接返回空数组，因为 Vue 会自动处理依赖关系
    // return [];
   return this.contextCenter?.getConsumers(context, this.component) ?? [];
  }
}