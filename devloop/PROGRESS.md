# PROGRESS

<!-- append-only。每完成一任務追加一節：日期、任務 ID、做了什麼、改動檔案、測試結果 -->
<!-- 例：
## 2026-07-07 — T-001
- 成果: 建立 todo.js 骨架與 JSON 存取層
- 改動: workspace/todo-cli/todo.js, workspace/todo-cli/todo.test.js
- 測試: 3/3 pass
-->

## 2026-07-07 — T-001
- 成果: 在 CatchList 新分支 `feat/desktop-ui` 建立 Electron app 骨架。選定
  `packages/desktop-ui`（package 名 `@catchlist/desktop-ui`），被根 `packages/*`
  glob 自動納入 workspaces，不需改根 package.json。主行程走 ESM，能啟動空白視窗。
- 改動: workspace/CatchList/packages/desktop-ui/{package.json,main.mjs,index.html}、
  workspace/CatchList/package-lock.json（裝 electron@38 後自動變動）
- 測試: smoke test（SMOKE_TEST=1 開機後立即 quit）親自跑通，exit code 0
- 備註: 依賴安裝由已核准 GOAL 授權；越界檢查通過（三抓取模組/core/排程檔零 diff，master 未動）
- 啟動: `npm run start --workspace @catchlist/desktop-ui`（在 workspace/CatchList/ 下）
