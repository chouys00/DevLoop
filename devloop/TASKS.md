# TASKS

<!-- 格式：每任務一節。狀態機：proposed →(核准)→ todo → doing → done/blocked（autonomous 模式允許 proposed → doing） -->
<!-- 來源：human = 使用者指定；ai = AI 發想 -->

## T-001

- 狀態: todo
- 來源: human
- 描述: 建立 workspace/todo-cli/todo.js 骨架：util.parseArgs 子指令
  (add/list/done/remove) 的分派空殼 + JSON 存取層 (load/save)，並建立
  todo.test.js（node:test）驗證 JSON 存取層的讀寫。

## T-002

- 狀態: todo
- 來源: human
- 描述: 實作 add 與 list 子指令（含測試）。

## T-003

- 狀態: todo
- 來源: human
- 描述: 實作 done 與 remove 子指令（含測試、錯誤處理：不存在的 ID）。
