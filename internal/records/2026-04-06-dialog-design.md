# dialog 设计记录

日期: 2026-04-06目标 issue: #72参考: headless ui dialog, radix dialog, base ui dialog, hover-card, dropdown

## 设计原则

1. **协议层与宿主层分离**。dialog 原型不声明 "portal to body"，因为 portal 语义在不同端差异极大。web v0 先用 css `fixed inset-0` 实现视觉全屏覆盖，adapter 未来可提供原生 portal 映射。
2. **transition 同步通过 context 广播实现**。overlay 和 content 各自持有独立的 `asTransition`，由 root 通过 `DIALOG_CONTEXT` 的 `open` 字段统一驱动进入/离开。
3. **焦点管理复用现有 hook**。`asFocusScope({ trap: true })` 负责焦点陷阱， `asOverlay` 负责打开时自动 focus 和关闭时 restore focus。
4. **alertdialog 是 content 的变体**。不创建单独的原型族，通过 `alert` prop 控制行为差异。

## 部件拆分

| 部件 | 职责 | 关键 hook |
| --- | --- | --- |
| `dialog-root` | open 状态中枢，提供 context | `asOpenState` |
| `dialog-trigger` | 打开/切换 dialog | 无（纯事件） |
| `dialog-overlay` | 视觉遮罩层，跟随 open 做淡入淡出 | `asTransition` |
| `dialog-content` | 内容容器：焦点陷阱 + overlay 关闭策略 + 进入动画 | `asOverlay`, `asFocusScope`, `asTransition` |
| `dialog-title` | 语义标题，供 content 设 `aria-labelledby` | 无 |
| `dialog-description` | 语义描述，供 content 设 `aria-describedby` | 无 |
| `dialog-close` | 关闭按钮 | 无（操作 context） |

## context 协议

```ts
interface DialogContextValue {
  open: boolean;
  controlled: boolean;
  disabled: boolean;
  alert: boolean;
}
```

- root 负责 provide，所有子部件 subscribe。
- trigger 检测到 click 时，若非 disabled 且非 controlled，直接 toggle context.open。
- close 检测到 click 时，若非 disabled 且非 controlled，将 context.open 设为 false。
- overlay 只读 context.open，用于驱动自身的 transition 显隐。
- content 读 context.open，用于驱动自身的 transition，同时把 open 同步给内部的 `asOverlay` 状态。

## transition 同步策略

overlay 和 content 在各自的 `context.subscribe` 回调中，根据 `next.open` 调用各自 transition 的 controls：

```ts
if (next.open) {
  transitionControls.enter();
} else {
  transitionControls.leave();
}
```

两者默认 interrupt 策略都是 `reverse`，因此用户在动画中途再次触发 trigger 时，两个部件会同时反向过渡，不会出现overlay和内容脱节的问题。

## content 内部组合

```ts
const overlay = asOverlay({
  closeOnEscape: true,
  closeOnOutsidePress: !alert,
  closeOnFocusOutside: false,
  restore: 'trigger',
  entry: 'content',
});

const focusScope = asFocusScope({ trap: true });
const transition = asTransition();
```

- `asOverlay` 的 open/close 由 content 的生命周期和 context 同步驱动。
- 当 dialog 打开时，`overlay.openOverlay()` 被调用，asOverlay 会自动将焦点移到 content 内部。
- 当 dialog 关闭时，asOverlay 会自动 restore focus 到 trigger。
- `asFocusScope({ trap: true })` 保证 tab 循环不逃出 dialog。

## aria 映射

content 在 `onMounted` 时通过 `anatomy.partsOf(DIALOG_FAMILY, 'title')` / `'description'` 查找子部件，取得它们的 host element id（或通过 expose 读取），设置到 content 的 host element 上：

- `role="dialog"`（alert 为 true 时 `role="alertdialog"`）
- `aria-modal="true"`
- `aria-labelledby` => title 的 id
- `aria-describedby` => description 的 id

若未找到 title，则不设 `aria-labelledby`（降级到使用 aria-label 由应用层处理）。

## alert 变体规则

`dialog-content` 接受 `alert?: boolean` prop：

- `closeOnOutsidePress` 设为 `!alert`
- role 设为 `alert ? 'alertdialog' : 'dialog'`
- 其他行为不变

注意：即使 `alert=true`，ESC 关闭行为仍保留（现代 ux 惯例），应用层可自行拦截 `close` 事件。

## 文件结构

```
packages/prototypes/base/src/dialog/
  index.ts
  root.ts
  trigger.ts
  overlay.ts
  content.ts
  title.ts
  description.ts
  close.ts
  shared.ts
  types.ts
```

## shadcn dialog 设计

- `shadcn-dialog-root` -> 直接 export `base-dialog-root`
- `shadcn-dialog-trigger` -> 封装 `base-dialog-trigger`，加按钮样式
- `shadcn-dialog-overlay` -> 封装 `base-dialog-overlay`，加 `bg-black/50` 等
- `shadcn-dialog-content` -> 封装 `base-dialog-content`，加 `rounded-lg`, `shadow-xl`, `max-w-lg` 等
- `shadcn-dialog-title` -> 封装 `base-dialog-title`，加 `text-lg font-semibold`
- `shadcn-dialog-description` -> 封装 `base-dialog-description`，加 `text-sm text-muted-foreground`
- `shadcn-dialog-close` -> 封装 `base-dialog-close`，作为一个带样式的按钮

```
packages/prototypes/shadcn/src/dialog/
  index.ts
  root.ts
  trigger.ts
  overlay.ts
  content.ts
  title.ts
  description.ts
  close.ts
  types.ts
```

## 测试覆盖范围

### 契约测试 (packages/prototypes/base/test/dialog.test.ts)

1. root 受控/非受控 open 流转
2. trigger click 打开，close click 关闭
3. content 内部 asOverlay 的 ESC 关闭和 outsidePress 关闭
4. alert=true 时 outsidePress 不关闭
5. overlay 和 content 的 transition 状态随 root.open 同步变化

### adapter 集成测试

- react: `packages/adapters/react/test/dialog.test.ts`（新建）
- vue: `packages/adapters/vue/test/dialog.test.ts`（新建）
- wc: 可复用现有 expose 和 overlay 契约，若需要再补

验证：打开时 content 可见，关闭后不可见（或进入 closed 状态），焦点行为正常。

### demo 测试

- `apps/www` 中增加 controlled demo 和 command demo，使用 PrototypePreviewer 渲染。
- 不强制要求 a11y 审计工具，但确保 `aria-modal` 和 role 正确渲染在 dom 上。
