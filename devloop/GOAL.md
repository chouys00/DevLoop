# GOAL

mode: autonomous
<!-- autonomous = AI 發想的任務免核准直接執行；閘門（測試/邊界檢查）照常。
     但本目標要求：所有開發一律在新分支，穩定版分支不得更動。 -->

## 目標

為既有的 CatchList（`workspace/CatchList/`，動畫/電影/遊戲清單抓取工具）
新增一個 **Electron 桌面 UI**，讓使用者能：

1. **觸發抓取更新** — 在 UI 選種類（動畫/電影/遊戲）按鈕，手動跑該類更新
   （只能呼叫既有 npm script，如 `update:anime`/`update:movies`/`update:games`）。
2. **預覽最新清單** — 讀三份 md，至少能看到各類「最新幾批」新增的項目。
3. **篩選 / 搜尋** — 依評分門檻、類型、關鍵字、月份過濾與搜尋。
4. **手動增修條目** — 在 UI 編輯/新增/刪除清單項目，即時寫回 md。

以上四項是最小需求，不是上限。前端可用框架（React/Vue/Vite 等），
由 AI 依實作選定並在第一個任務說明理由。UI 程式碼放在 `workspace/CatchList/`
內（作為新 package 或頂層新目錄，AI 依 monorepo 慣例決定），
一律在 **CatchList repo 的新分支** 開發，穩定分支不動。

## 用途與發想方向

用途：讓使用者不必再開 Google Drive 上的三份 Markdown 檔，就能在一個
桌面視窗快速瀏覽最新入榜的動畫/電影/遊戲、篩選找想看的、必要時手動微調，
並在想要時即時觸發某一類的更新。

發想新任務時以這個用途為基底，鼓勵提出使用者可感知的新功能與 UI/UX
改善（清單排版、封面/連結、批次開商店頁、更新進度顯示、跨類統一檢視、
標記已看/想看等）。技術品質類任務照常可提，但不應是主體。

**資料來源**：三份清單 md 目前由各模組 config 寫死在 `D:/GoogleDrive_Sync/`
（`動畫.md`/`電影.md`/`遊戲.md`）。UI 應讀這些路徑，並讓路徑可設定
（預設沿用各模組現值）。md 的區段格式（`YYYY  M月/季` 標題行 +
`------------------------------` 分隔線）同時是排程的「狀態來源」，
解析與寫回一律複用 `packages/core` 的 `mdstore.js`。

## 限制

- 桌面框架用 **Electron**（Node 原生，直接重用現有 axios / npm workspaces 生態）
- 前端允許框架；後端/主行程沿用專案的 Node.js ESM 風格
- 觸發更新只能呼叫既有 npm script，不得複製或改寫抓取邏輯
- 手動增修寫回 md 一律走 `packages/core/mdstore.js`，嚴格保留標題行與分隔線格式
- 所有新程式碼放在 `workspace/CatchList/` 內
- 一律在 CatchList repo 的新分支開發（與穩定版隔離）

## 絕不做

- 不影響原本的定期執行方式：不改 `run_monthly.bat`、`scripts/update-all.mjs`、
  `npm run update:*` 腳本，或任何排程觸發路徑
- 不修改三個抓取模組（`imdb_tracker`/`spiderMAL`/`steam_discovery`）的
  抓取邏輯、評分門檻、輸出格式或 md 區段契約
- 不在 main / 穩定分支上直接開發或提交
- 不用自訂寫入破壞 md 的 `YYYY  M月` 標題行與 `------------------------------` 分隔線
- 不碰 `workspace/CatchList/` 以外的程式碼
- 不修改 `devloop/GOAL.md`（本檔只有使用者可改）
- 不刪除既有測試 / 腳本
