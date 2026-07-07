# GOAL

mode: hybrid
<!-- hybrid = AI 發想的任務需使用者核准；autonomous = 免核准直接執行 -->

## 目標

在 `workspace/todo-cli/` 做一個 Node.js CLI 待辦事項工具（單檔 `todo.js`，
Node 22 內建模組 only，資料存 JSON 檔）。add / list / done / remove 四個
子指令是最小需求，不是上限。

## 用途與發想方向

工具的用途：讓一個天天開終端機的開發者，用最少打字管理自己的待辦。
發想新任務時以這個用途為基底，鼓勵提出使用者可感知的新功能與
UI/UX 改善（新子指令、輸出排版、提示訊息、互動體驗），不必侷限於
最小指令集；技術品質類任務照常可提，但不應是主體。

## 限制

- Node 22 內建模組 only（`node:fs`、`node:util` 的 parseArgs、`node:test`），不裝任何 npm 套件
- 所有程式碼與測試放在 `workspace/todo-cli/` 內
- 測試寫在 `todo.test.js`，以 `node --test` 可跑為準

## 絕不做

- 不碰 `workspace/` 以外的程式碼
- 不修改 `devloop/GOAL.md`（本檔只有使用者可改）
- 不做網路請求、不裝依賴、不刪除既有測試
