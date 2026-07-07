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

## 2026-07-07 — T-002
- 成果: desktop-ui 加入 md 讀取層 + 預覽最新清單（純讀）。reader.mjs 用
  core 的 `loadSections`（唯讀複用，未改 core），取排序後最新 N 區段；
  config.mjs 支援路徑覆寫（env > catchlist.paths.json > 三模組 config 預設值，
  以 import 取值不改原檔）。Electron 正規架構：preload contextBridge +
  `ipcMain.handle`，renderer 用 vanilla DOM 三欄呈現。檔案不存在/空檔優雅處理。
- 改動: packages/desktop-ui/{src/reader.mjs,src/config.mjs,preload.cjs,
  renderer.mjs,test/reader.test.mjs,test/fixtures/*,main.mjs,index.html,package.json}
- 測試: node --test 7/7 pass（排序/count/解析/空檔/缺檔/錯誤路徑）；smoke 仍 exit 0
- 前端: vanilla DOM 無框架（純唯讀清單，輕量）

## 2026-07-07 — T-003
- 成果: UI 觸發抓取更新。updater.mjs spawn 接線層以 cwd=repo 根呼叫既有
  `update:anime|movies|games`（→ npm run update --workspace spiderMAL/imdb_tracker/
  steam_discovery），只呼叫不改抓取邏輯。Windows npm.cmd 用 shell:true、
  指令可注入；執行中類別擋重複觸發。IPC 混合式：ipcMain.handle 回最終結果 +
  webContents.send 串流進度；三顆按鈕顯示執行中/成功/失敗+exit code。
- 改動: packages/desktop-ui/{src/updater.mjs,test/updater.test.mjs,main.mjs,
  preload.cjs,renderer.mjs,index.html}
- 測試: node --test 15/15 pass（全用 dummy node -e 指令，未觸發真實更新）；smoke exit 0
- 越界: 清掉一個 subagent shell 誤建於 repo 根的 0-byte 殘留檔 `process.exit(0)`

## 2026-07-07 — T-004
- 成果: 篩選/搜尋 + 手動增修寫回。parse.mjs 將區段解析為結構化項目（各類
  各自 regex，失敗欄位給 null 不崩潰）；filter.mjs 純函式支援門檻≥/關鍵字
  （不分大小寫）/類型/月份交集過濾。寫回層 writeback.mjs 用 core `writeSectionsFile`
  序列化 + 自寫順序保留解析器 + 合成鍵繞開 core 的重排/季別鍵碰撞，達 byte 級保真；
  原子寫入（*.tmp → rename）。IPC 暴露 getItems/editItem/addItem/deleteItem。
- 改動: packages/desktop-ui/{src/parse.mjs,src/filter.mjs,src/writeback.mjs,
  src/browse.mjs,test/{parse,filter,writeback,browse}.test.mjs,
  test/fixtures/{anime,movies,games}-real.md,main.mjs,preload.cjs,renderer.mjs,index.html}
- 測試: node --test 45/45 pass（寫入測試僅對 os.tmpdir() fixture 複本，未寫真實 md）；smoke exit 0
- 保真驗證: round-trip 後標題行 + 30-dash 分隔線骨架逐字相等，僅目標欄位變動

## 2026-07-07 — T-005
- 成果: 預覽層改走順序保留解析（parse.mjs splitDocument），棄用 core
  loadSections 的 Map 路徑 —— 動畫同年多季不再碰撞遺失、遊戲前言不再
  影響區段。穩定排序（年 desc → 月/季 desc → 檔案原順序），介面不變
  main.mjs 免改。LESSONS 的預覽疑慮解除。
- 改動: packages/desktop-ui/{src/reader.mjs,test/reader.test.mjs,
  test/fixtures/anime-seasons.md}
- 測試: node --test 50/50 pass（新增 5，TDD 先紅後綠；調度員親自複跑確認）

## 2026-07-07 — T-006
- 成果: 條目外部連結。links.mjs 純函式組 URL（動畫→MAL 搜尋、電影→IMDb
  tt id 直達/搜尋、遊戲→Steam appid 直達/搜尋）；parse 補抽 imdbId/appid；
  主行程組 URL 經 shell.openExternal（不信任 renderer 傳 URL），每列 🔗 按鈕。
- 改動: packages/desktop-ui/{src/links.mjs,src/parse.mjs,src/browse.mjs,
  main.mjs,preload.cjs,renderer.mjs,test/{links,parse,browse}.test.mjs}
- 測試: node --test 66/66 pass（新增 16，先紅後綠；調度員親自複跑確認）

## 2026-07-07 — T-007
- 成果: 更新體驗閉環。log 依類別分區即時面板（stderr 標紅）；成功後
  自動重讀該類清單並以差集（monthKey+raw 合成鍵，update-view.mjs 純函式）
  高亮 NEW 項目；失敗保留面板紅標 exit code。updater/main/preload 未動。
- 改動: packages/desktop-ui/{src/update-view.mjs,test/update-view.test.mjs,
  renderer.mjs,index.html}
- 測試: node --test 77/77 pass（新增 11，先紅後綠；調度員親自複跑確認）
