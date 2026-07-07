# LESSONS

<!-- 踩雷教訓：環境問題、依賴陷阱、反覆犯的錯。新 session 開場必讀。保持精簡，過時就刪。 -->

- 專案路徑含中文：跑指令一律用 PowerShell（Git Bash 會把路徑編碼弄壞）。
- CatchList monorepo：新 package 放 `packages/*` 下即被 workspaces 自動納入，不需改根 package.json。`npm install --workspace <name>` 首次可能印 `no workspace folder present` 警告，但仍正確安裝，可忽略。
- CatchList 是巢狀 git repo（`workspace/CatchList/.git`），與外層 DevLoop repo 各自獨立：UI 工作 commit 在 CatchList 的 `feat/desktop-ui` 分支，devloop 狀態檔 commit 在外層 repo。穩定分支是 CatchList 的 `master`。
- desktop-ui 要用 `@catchlist/core` 時：workspace symlink 是空目錄（package 名解析不到），改用相對路徑 `../../core/mdstore.js` 唯讀匯入 sibling 才穩。Electron 架構已備 preload contextBridge + `ipcMain.handle`，T-003/T-004 沿用同一 IPC 橋。
