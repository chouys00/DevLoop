# PROGRESS

<!-- append-only。每完成一任務追加一節：日期、任務 ID、做了什麼、改動檔案、測試結果 -->
<!-- 例：
## 2026-07-07 — T-001
- 成果: 建立 todo.js 骨架與 JSON 存取層
- 改動: workspace/todo-cli/todo.js, workspace/todo-cli/todo.test.js
- 測試: 3/3 pass
-->

## 2026-07-07 — T-001

- 成果: 建立 todo.js 骨架（parseArgs 分派空殼 + JSON 存取層）與 todo.test.js
- 改動: workspace/todo-cli/todo.js, workspace/todo-cli/todo.test.js
- 測試: 4/4 pass（node --test，調度員親自複跑確認）

## 2026-07-07 — T-002

- 成果: 實作 add 與 list 子指令（add 串接多字詞、id 遞增；list 空清單印 (empty)、格式 [ ]/[x] id. text）
- 改動: workspace/todo-cli/todo.js, workspace/todo-cli/todo.test.js
- 測試: 10/10 pass（新增 6 個，調度員親自複跑確認）

## 2026-07-07 — T-003

- 成果: 實作 done 與 remove 子指令（parseId 驗證、不存在 id 明確丟錯且不動檔案）
- 改動: workspace/todo-cli/todo.js, workspace/todo-cli/todo.test.js
- 測試: 16/16 pass（新增 6 個，調度員親自複跑確認）
