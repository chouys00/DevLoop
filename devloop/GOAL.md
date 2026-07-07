# GOAL

mode: hybrid
<!-- hybrid = AI 發想的任務需使用者核准；autonomous = 免核准直接執行 -->

## 目標

在 `workspace/todo-cli/` 做一個 Node.js CLI 待辦事項工具（單檔 `todo.js`，
Node 22 內建模組 only，資料存 JSON 檔）。支援 add / list / done / remove 四個子指令。

## 限制

- Node 22 內建模組 only（`node:fs`、`node:util` 的 parseArgs、`node:test`），不裝任何 npm 套件
- 所有程式碼與測試放在 `workspace/todo-cli/` 內
- 測試寫在 `todo.test.js`，以 `node --test` 可跑為準

## 絕不做

- 不碰 `workspace/` 以外的程式碼
- 不修改 `devloop/GOAL.md`（本檔只有使用者可改）
- 不做網路請求、不裝依賴、不刪除既有測試
