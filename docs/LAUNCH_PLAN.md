# PocketMock v1.0.0 上线发布计划 (Launch Plan)

## 目标
- 成功发布 PocketMock v1.0.0 到 npm。
- 扩大项目知名度，吸引前端开发者使用和贡献。
- 确保项目文档（README）清晰、有吸引力，能快速引导用户。

## 任务清单

### ✅ 1. 物料准备 (Assets)

*   **GIF 录制**:
    *   [ ] **核心演示 (Hero Demo)**: 录制一个约 15-20 秒的 GIF。
        *   **内容**: 展示流程：页面右下角打开浮窗 -> 修改一个 Mock 规则的 JSON -> 点击 "Save" -> 页面发起请求 -> 浮窗显示拦截日志 -> 页面展示修改后的数据。
        *   **用途**: README.zh-CN.md, README.md, 掘金/SegmentFault/知乎文章，推广推文。
    *   [ ] **导入功能演示 (Import Demo)**: 录制一个短 GIF。
        *   **内容**: 展示点击 "Import" 按钮 -> 选择 Postman 或 OpenAPI JSON 文件 -> 列表自动填充规则的过程。
        *   **用途**: 掘金/SegmentFault/知乎文章。
    *   **工具推荐**: Mac 上可以使用 **Kap** 或 **LiceCap**。录制后使用 **ezgif.com** 压缩体积（建议 < 3MB）。

### 🎬 GIF 录制脚本 (Recording Scripts)

#### 📦 视频 1：核心演示 (Hero Demo)
**目标**: 在 README 头部展示，用 15-20 秒让用户明白“这是什么”以及“如何工作”。
**场景**: 一个简单的 User List 页面。

| 时间 (秒) | 动作 (Action) | 画面焦点 (Focus) | 预期效果 |
| :--- | :--- | :--- | :--- |
| **00-02s** | 鼠标点击页面右下角的 **PocketMock 悬浮球**。 | 右下角悬浮球 -> 展开面板 | 面板平滑展开，展示出当前无规则的状态。 |
| **02-05s** | 点击面板上的 **"+" (Add)** 按钮。在 Input 中输入 `/api/users`。 | Dashboard 顶部操作栏 | 快速创建一个新的 Mock 规则。 |
| **05-10s** | **高光时刻**: 在 Body 编辑器中输入 Smart Mock 模板：<br>`{ "users|3": [{ "name": "@cname", "avatar": "@image" }] }` | JSON 编辑器区域 | 展示代码高亮和智能语法。 |
| **10-12s** | 点击 **"Save"** 按钮，然后收起面板。 | 底部 Action Bar -> 页面 | 规则生效，准备验证。 |
| **12-14s** | 点击页面上的 **"Fetch Users"** 按钮。 | 页面主体 | 模拟真实业务请求触发。 |
| **14-18s** | 页面渲染出 3 个带有随机中文名和头像的用户卡片。右下角弹出 Toast: "Request Intercepted"。 | 页面数据渲染区 | **见证奇迹**: 拦截成功，数据动态生成。 |

#### 📦 视频 2：一键导入演示 (Import Demo)
**目标**: 展示“团队协作”和“迁移成本低”，用于文章中段。

| 时间 (秒) | 动作 (Action) | 画面焦点 (Focus) | 预期效果 |
| :--- | :--- | :--- | :--- |
| **00-02s** | 打开面板，点击顶部 Header 的 **"Import"** 按钮。 | Dashboard Header | 明确入口位置。 |
| **02-05s** | 系统弹出文件选择框，选中一个 `postman_collection.json` 文件。 | 文件选择弹窗 | 暗示支持标准格式。 |
| **05-08s** | **高光时刻**: 列表瞬间填满了几十条规则。鼠标悬停在其中一条规则上。 | 规则列表 | 展示批量导入的震撼感。 |
| **08-12s** | 点击该规则进入编辑模式，展示 Body 中自动填充的 `@email`, `@guid` 等占位符。 | JSON 编辑器 | 展示**智能推断**能力。 |

### 📝 2. 文档优化 (Documentation)

*   **README.zh-CN.md**:
    *   [ ] **插入 GIF**: 将录制好的 Hero Demo GIF 插入到 README 中。
    *   [ ] **一句话卖点**: 检查开头的第一句话是否足够吸引人。
    *   [ ] **徽章 (Badges)**: 确保 npm version, license 等徽章链接正确。

*   **README.md (English)**:
    *   [ ] **同步更新**: 确保英文版 README 的内容、GIF 和结构与中文版保持一致。

### ✍️ 3. 文章撰写 (Content Marketing)

*   **推文草稿 (Twitter / 微博 / 朋友圈)**:
    *   **文案**: (草稿待定，需包含痛点、PocketMock 解决方式、核心功能、GitHub 链接，配 GIF/图)

*   **掘金 / SegmentFault / 知乎 文章草稿 (技术深度向)**:
    *   **标题**: (草稿待定，需吸引前端开发者)
    *   **内容大纲**:
        1.  **项目背景与痛点**:
            *   传统 Mock 方式的不足（效率低、不直观、难以维护）。
            *   为什么需要 PocketMock (所见即所得、浏览器内、零侵入)。
        2.  **PocketMock 核心特性** (结合截图和 GIF 详细介绍):
            *   **智能控制台**: 内置编辑器、深色/浅色主题、Toast。
            *   **双核拦截引擎**: `fetch` & `XHR` 无缝拦截。
            *   **动态响应**: JS 函数式 Mock，处理复杂逻辑。
            *   **智能 Mock 数据生成**: `@guid`, `@cname`, `@image` 等，数组生成 (`key|count`)。这是亮点，要着重介绍。
            *   **配置导入**: Postman Collection & OpenAPI 3.0，智能推断。这是解决团队痛点。
            *   **功能全面的网络面板**: 实时日志、搜索筛选、“一键 Mock”。
            *   **双模持久化**: LocalStorage & 文件系统（通过 Vite 插件）。
        3.  **技术亮点简述**:
            *   Shadow DOM 隔离。
            *   Monkey Patching 原理。
            *   Vite 插件如何实现文件系统同步。
        4.  **快速开始**: 详细的安装和使用教程，包括 Vite 插件模式。
        5.  **未来展望**: 简单提及 Roadmap 中 v2.x 和 v3.x 的计划（如 Stateful Mock、CLI 工具等）。
        6.  **结尾**: 号召 Star、Issue、贡献代码。

### 🚀 4. 发布流程 (Release)

*   [ ] **npm publish**:
    *   确保 `package.json` 版本号为 `v1.0.0`。
    *   运行 `npm publish`。
*   [ ] **GitHub Release**:
    *   在 GitHub 上创建一个新的 Release。
    *   Tag 为 `v1.0.0`。
    *   Release Note 内容复制自 `CHANGELOG.md`。

---

## 下一步行动

请根据上述清单，指示我完成接下来的任务。例如，您可以让我开始撰写掘金文章草稿。
