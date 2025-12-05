# 贡献指南

首先，感谢你有兴趣为 PocketMocker 做出贡献！正是因为有像你这样的开发者，开源社区才变得如此精彩。

## 开发环境搭建

1. **Fork 并克隆** 仓库：
   ```bash
   git clone https://github.com/YOUR_USERNAME/pocket-mocker.git
   cd pocket-mocker
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **启动开发服务器**：
   ```bash
   npm run dev
   ```
   这将启动 Vite 开发服务器并打开一个 Demo 页面，你可以在其中实时测试你的更改。

## 项目结构

项目代码结构组织如下：

```
src/
├── core/                 # 核心逻辑 (大脑)
│   ├── adapters/         # 拦截适配器 (fetch/XHR 的 Patch 实现)
│   ├── engine/           # 核心引擎 (请求匹配、处理、智能 Mock 数据生成)
│   ├── manager/          # 规则状态管理 (Rule Manager)
│   ├── importers/        # 外部配置导入逻辑 (Postman/OpenAPI)
│   └── utils/            # 通用工具函数
├── lib/                  # UI 组件 (基于 Svelte)
│   ├── components/       # 业务组件
│   │   ├── layout/       # 布局组件 (Header, Tabs, Container)
│   │   ├── rules/        # 规则管理组件 (列表, 编辑器, 过滤器)
│   │   └── network/      # 网络日志组件 (日志列表, 详情)
│   ├── stores/           # UI 状态管理 (dashboard-store)
│   └── ui/               # 通用基础组件 (Button, Input, JsonEditor 等)
├── store/                # 全局业务状态 (规则数据, 日志数据)
├── plugin/               # Vite 插件源码
└── test/                 # 单元测试和集成测试
```

## 测试

我们使用 **Vitest** 进行测试。在提交 PR 之前，请确保所有测试通过。

```bash
# 运行所有测试
npm run test

# 以监听模式运行测试
npm run test -- --watch
```

如果你添加了新功能，请务必在 `test/` 目录下添加相应的测试用例。

## 提交规范 (Commit Guidelines)

我们遵循 **Conventional Commits** 规范。

- `feat`: 新功能 (feature)
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式修改 (不影响代码运行的变动)
- `refactor`: 重构 (即不是新增功能，也不是修改 bug 的代码变动)
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

**示例:** `feat(core): 增加对 GraphQL Mock 的支持`

## Pull Request 流程

1. 基于 `main` 分支创建一个新分支: `git checkout -b feat/my-new-feature`。
2. 进行代码修改，并按照上述规范提交 Commit。
3. 运行测试以确保没有引入回归问题: `npm run test`。
4. 推送分支到你的 Fork 仓库: `git push origin feat/my-new-feature`。
5. 在 GitHub 上发起 Pull Request。
6. 请提供清晰的变更描述，并关联相关的 Issue (如果有)。

再次感谢你的贡献！
