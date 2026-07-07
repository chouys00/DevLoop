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

- 狀態: done
- 來源: human
- 描述: 篩選/搜尋 + 手動增修寫回。清單支援評分門檻/類型/關鍵字/月份篩選
  與搜尋；並可在 UI 編輯/新增/刪除條目，一律透過 `mdstore.js` 即時寫回
  md，嚴格保留 `YYYY  M月` 標題行與 `------------------------------`
  分隔線格式。

## T-005

- 狀態: done
- 來源: ai
- 描述: 修正預覽層資料遺失：T-002 的 reader.mjs 用 core `loadSections`，
  動畫同年多季會因季別鍵碰撞只顯示一季、遊戲 md 前言被吃掉（LESSONS 已記）。
  改用 T-004 已寫好的順序保留解析器（writeback/parse 那套），讓預覽與
  瀏覽頁資料一致。含測試（fixture 需含同年多季案例）。
  （情境：使用者找新番，春季番整批看不到卻不自知。）

## T-006

- 狀態: done
- 來源: ai
- 描述: 條目外部連結：每個項目提供「開啟詳情頁」動作，動畫連 MAL 搜尋、
  電影連 IMDb（有 tt id 用 id，無則搜尋）、遊戲連 Steam 商店/搜尋，
  一律 shell.openExternal 用系統瀏覽器開啟；UI 上做成項目列的圖示或
  按鈕。含測試（URL 組裝純函式測試即可，不實際開瀏覽器）。
  （情境：看到有興趣的條目，現在得自己複製名稱去 Google。）

## T-007

- 狀態: proposed
- 來源: ai
- 描述: 更新體驗閉環：觸發更新時顯示即時輸出面板（滾動 log，串流已有
  webContents.send 管道），結束後自動重新載入該類清單並高亮本次新增
  項目；失敗時 log 面板保留並標紅 exit code。含測試（dummy 指令）。
  （情境：按下更新等兩分鐘不知進度，跑完清單也不會自己變新。）

## T-008

- 狀態: proposed
- 來源: ai
- 描述: 「想看/已看」個人標記：項目可標記狀態並持久化於 desktop-ui 自己的
  sidecar JSON（絕不寫進三份 md，鍵用類型+標題+區段合成）；清單顯示
  標記徽章並可依標記篩選。含測試。
  （情境：瀏覽時看到想看的，下次打開還得憑記憶重找。）
