class VuePropsManager<T extends Record<string, any> = Record<string, any>> {
  private _props: T = {} as T;
  private _changeCallbacks: Array<(props: T) => void> = [];
  private _lock = false; // 防止递归触发

  constructor(initial?: T) {
    if (initial) {
      this._props = { ...initial };
    }
  }

  /** 获取当前 props 状态 */
  getProps(): T {
    return { ...this._props };
  }

  /** 更新 props 状态，触发所有回调 */
  setProps(props: Partial<T>) {
    if (this._lock) return;
    this._lock = true;

    this._props = { ...this._props, ...props };
    if (Object.keys(props).length > 0) {
      this._changeCallbacks.forEach((cb) => cb(this.getProps()));
    }

    this._lock = false;
  }

  /** 注册 props 变化监听器 */
  onPropsChange(callback: (props: T) => void) {
    this._changeCallbacks.push(callback);
  }

  /** 定义初始 props */
  defineProps(initial: T) {
    this._props = { ...this._props, ...initial };
  }

  /** 生成 Vue defineComponent 所需的 props 定义 */
  getVuePropsDefinition(): Record<string, any> {
    return Object.keys(this._props).reduce((acc, key) => {
      const value = this._props[key];
      acc[key] = { type: value != null ? (value.constructor as any) : Object, default: value };
      return acc;
    }, {} as Record<string, any>);
  }

  /** 将 Vue props 的初始值同步到内部状态 */
  getVuePropsActualValue(vueProps: Partial<T>) {
    this._props = { ...this._props, ...vueProps };
  }
}

export default VuePropsManager;
