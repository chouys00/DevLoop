# TASKS

<!-- 格式：每任務一節。狀態機：proposed →(核准)→ todo → doing → done/blocked（autonomous 模式允許 proposed → doing） -->
<!-- 來源：human = 使用者指定；ai = AI 發想 -->

## T-001

- 狀態: done
- 來源: human
- 描述: 建立 workspace/todo-cli/todo.js 骨架：util.parseArgs 子指令
  (add/list/done/remove) 的分派空殼 + JSON 存取層 (load/save)，並建立
  todo.test.js（node:test）驗證 JSON 存取層的讀寫。

## T-002

- 狀態: done
- 來源: human
- 描述: 實作 add 與 list 子指令（含測試）。

## T-003

- 狀態: done
- 來源: human
- 描述: 實作 done 與 remove 子指令（含測試、錯誤處理：不存在的 ID）。

## T-004

- 狀態: proposed
- 來源: ai
- 描述: 無子指令或未知子指令時，印出 usage 說明（四個子指令與 --file 選項）
  並以非零 exit code 結束，取代目前的 throw 堆疊。含測試。

## T-005

- 狀態: proposed
- 來源: ai
- 描述: JSON 資料檔損壞（非合法 JSON、或頂層不是陣列）時給明確錯誤訊息
  而非原始堆疊，且不覆寫原檔。含測試。

## T-006

- 狀態: proposed
- 來源: ai
- 描述: list 增加 --pending 旗標，只顯示未完成項目。含測試。

## T-007

- 狀態: proposed
- 來源: ai
- 描述: 新增 CLI 整合測試：以 node:child_process 實際執行 node todo.js
  各子指令，驗證 stdout 與 exit code（目前測試都是 require 函式層級）。
