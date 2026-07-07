# TASKS

<!-- 格式：每任務一節。狀態機：proposed →(核准)→ todo → doing → done/blocked（autonomous 模式允許 proposed → doing） -->
<!-- 來源：human = 使用者指定；ai = AI 發想 -->

## T-001

- 狀態: done
- 來源: human
- 描述: 在 CatchList repo 切新分支，建立 Electron app 骨架：選定放
  `packages/` 下新 package 或頂層新目錄（依 monorepo 慣例決定並在提交
  說明理由）、掛進 npm workspaces、主行程走 ESM、一個能啟動的空視窗。
  不動任何既有抓取模組與排程檔。

## T-002

- 狀態: done
- 來源: human
- 描述: md 讀取層 + 預覽最新清單。以 `packages/core/mdstore.js` 解析三份
  md（路徑可設定，預設沿用各模組 config 現值），在 UI 分頁顯示動畫/電影/
  遊戲各自「最新幾批」新增項目。純讀，不寫回。

## T-003

- 狀態: done
- 來源: human
- 描述: 觸發抓取更新。UI 三顆按鈕（動畫/電影/遊戲），各自以 child_process
  呼叫既有 `npm run update:anime|movies|games`，顯示執行中狀態與結束
  （exit code）結果。嚴禁複製或改寫抓取邏輯。

## T-004

- 狀態: todo
- 來源: human
- 描述: 篩選/搜尋 + 手動增修寫回。清單支援評分門檻/類型/關鍵字/月份篩選
  與搜尋；並可在 UI 編輯/新增/刪除條目，一律透過 `mdstore.js` 即時寫回
  md，嚴格保留 `YYYY  M月` 標題行與 `------------------------------`
  分隔線格式。
