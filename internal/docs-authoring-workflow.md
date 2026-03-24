# Docs Authoring Workflow

## Goal

Keep drafting and polishing on the final documentation path, so content does not need to be moved later.

## Working Agreement

1. You tell Codex which article you want to write.
2. Codex maps it to the exact target file under `apps/www/src/content/docs/{zh-cn,en}/...`.
3. If the file already exists as an outline, you write directly in that file.
4. If the file does not exist yet, Codex creates it with frontmatter and a minimal draft skeleton.
5. After your draft is ready, you ask Codex to polish it.
6. Codex compares the draft against the original outline, edits the file, and lists open issues or weak arguments that still need discussion.

## File Placement Rule

- Chinese docs: write in `apps/www/src/content/docs/zh-cn/...`
- English docs: write in `apps/www/src/content/docs/en/...`
- If a page already exists, do not create a parallel `draft` copy unless there is a strong reason.
- Prefer editing the formal doc file directly, because the sidebar and slug are already stable.

## Drafting Rule

- Preserve the existing frontmatter.
- Keep the existing outline headings if they are already useful.
- Replace `写作提示` and placeholder bullets with real prose gradually.
- If a section is incomplete, leave one explicit marker:
  - `TODO:`
  - `QUESTION:`
  - `VERIFY:`

## Codex Responsibilities

- Tell you the exact file path before you start writing.
- Create the draft file for you when needed.
- Preserve the article structure and frontmatter.
- Polish for clarity, pacing, terminology consistency, and section transitions.
- Point out missing examples, unsupported claims, duplicated ideas, and structure problems after polishing.

## User Responsibilities

- Write the first complete draft instead of sentence fragments when possible.
- Keep uncertain statements marked with `QUESTION:` or `VERIFY:`.
- Tell Codex when the draft is ready for polishing.

## Ready-to-Use Request Format

### Start a draft

`帮我开始写 “如何开始使用 Proto UI？” 这一篇，先告诉我文件位置。`

### Create a draft file

`帮我为 “XXX” 创建草稿文件，我来写。`

### Polish a draft

`我已经写完初稿了，请结合原大纲润色，并指出还需要讨论的问题。`

## Minimal Draft Template

```md
---
title: '文档标题'
desp: '一句话摘要'
description: '一句话摘要'
---

## 这篇文章要回答什么？

用 1 到 3 句话交代本文回答的问题。

## 正文主段落

先写完整解释，再补例子。

## 常见误解 / 边界

说明这篇文章不打算覆盖什么。

## 下一步怎么读？

- 前往 `相关章节 A`
- 前往 `相关章节 B`

QUESTION: 这里是否需要一个最小示例？
```
