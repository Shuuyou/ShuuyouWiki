# Shuuyou Wiki 内容维护与撰写指南

## 1. 目标

本项目内容由两部分组成：

1. 首页配置：`content/editor/homepage.json`
2. Wiki 内容：`content/docs/<module>/<topic>/index.mdx`

你可以通过本地可视化编辑器维护，或直接编辑文件。

## 2. 当前协作阶段

当前采用单仓 public 策略，处于维护者主导建设阶段。

1. 仓库公开，方便阅读与追踪进展。
2. 当前只允许维护者编辑与合并，暂不开放外部贡献。
3. 未来开放协作时，会先更新首页文案与 `CONTRIBUTING.md`。

## 3. 本地可视化编辑器

运行命令：

```bash
npm run editor
```

默认地址：`http://localhost:3399`

### 功能

1. 主页编辑：Tagline、简介、模块卡、信息卡。
2. Wiki 页面编辑：
   - 选择模块与主题。
   - 创建新主题（slug）。
   - 编辑标题、描述、正文。
   - 插入 `EditorBlock` 组件片段，用于可调宽度与语义样式。

### 说明

编辑器在 `tools/visual-editor/` 下，是独立 Node 工具，不是 Next 路由：

- 不会被 Next.js `build` 打包成线上页面。
- 不会被 Vercel 站点直接发布。

## 4. 直接编辑文件

### 首页

编辑：`content/editor/homepage.json`

字段说明：

- `tagline`: 首页 Logo 下副标题
- `intro`: 首页说明文字
- `modules`: 模块卡数组
  - `title`, `sub`, `href`, `desc`
- `infoCards`: 信息卡数组
  - `title`, `text`, `href`, `action`
- `collaboration`: 协作阶段配置
  - `enabled`: 是否开放外部协作文案
  - `title`, `message`, `href`, `linkText`

### Wiki 页面

编辑：`content/docs/<module>/<topic>/index.mdx`

建议格式：

```mdx
---
title: "页面标题"
description: "页面描述"
updatedAt: "2026-04-05"
contributors:
  - "shuuyou"
license: "CC BY-SA 4.0"
discussionEnabled: false
---

正文内容...

<EditorBlock width={80} tone="note">
这里是强调内容
</EditorBlock>
```

`EditorBlock` 参数：

- `width`: 30-100（百分比）
- `tone`: `plain | note | warn`

页面底部元信息组件会读取以下 frontmatter 字段：

- `updatedAt`: 更新时间
- `contributors`: 贡献者列表
- `license`: 页面协议（默认 `CC BY-SA 4.0`）
- `discussionEnabled`: 是否开启页面评论（当前建议 `false`）
- `discussionUrl`: 评论或讨论入口（可选）

## 5. 模块与主题约定

- 模块目录：`content/docs/infrastructure`、`hardware`、`perception`、`simulation`
- 主题目录：每个主题一个子目录，至少包含 `index.mdx`
- 模块导航由 `meta.json` 管理，`root: true` 表示可作为模块下拉入口。

## 6. 发布与协作建议

1. 在本地编辑并提交内容。
2. 通过 PR 审核后合并主分支。
3. Vercel 自动部署站点。

推荐在 CI 中增加检查：

- `npm run lint`
- `npm run build`

## 7. 评论策略

当前不开放站内评论交互，页面底部会显示“评论暂未开放”占位。

后续如需开启：

1. 为页面设置 `discussionEnabled: true`。
2. 填写 `discussionUrl`，或接入评论服务组件。
3. 若使用 giscus，需要公开仓库并开启 GitHub Discussions。

## 8. 双仓迁移预案（暂不实施）

若未来改为主仓 private + 内容仓 public，建议最小清单：

1. 内容仓触发器 workflow（内容变更后发送 dispatch）。
2. 主仓同步 workflow（接收 dispatch 后拉取内容并验证）。
3. 统一内容版本策略（tag 或 commit pin）。
4. 失败回滚与冲突处理流程文档。

当前阶段不建议启用双仓自动化，优先保持单仓流程稳定。

## 9. 常见问题

### Q1: 为什么线上看不到可视化编辑器？

因为编辑器是本地工具，不属于 Next 的 app 路由。

### Q2: 为什么文档标题会重复？

不要在 `index.mdx` 中再写一级标题 `# 标题`。页面框架会自动渲染 frontmatter 的 `title`。

### Q3: 深色模式正文发暗怎么办？

检查 `app/global.css` 的 `.dark .prose p`、`.dark .prose li` 等覆盖是否被误改。
