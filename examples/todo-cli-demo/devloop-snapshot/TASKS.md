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
- 描述: CLI 錯誤輸出人性化：add/done/remove 的錯誤（缺參數、找不到 id）
  目前以 throw 堆疊呈現給 CLI 使用者，改為單行錯誤訊息 + 非零 exit code
  （usage 說明已存在，維持不動）。含測試。

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

## T-008

- 狀態: proposed
- 來源: ai
- 描述: list 輸出美化：ID 欄位對齊、每項前綴 [ ]/[v] 完成標記、
  已完成項以 ANSI 灰色呈現（偵測非 TTY 或 NO_COLOR 環境變數時自動
  關閉色彩，只用內建能力不裝套件）。含測試。
  （情境：使用者一天開 list 十幾次，掃視速度就是體驗。）

## T-009

- 狀態: proposed
- 來源: ai
- 描述: 操作回饋與空清單引導：add/done/remove 成功後輸出一行確認訊息
  （含受影響項目的 ID 與內容）；list 在清單全空時顯示
  「目前沒有待辦，用 todo add <內容> 新增」而非空白。含測試。
  （情境：新手第一次跑 list 看到空白會以為壞了。）

## T-010

- 狀態: proposed
- 來源: ai
- 描述: list 新增 --search <關鍵字> 旗標，依內容子字串過濾（不分大小寫），
  無符合時顯示明確訊息。含測試。
  （情境：待辦累積超過一屏後，用肉眼找特定事項太慢。）

## T-011

- 狀態: proposed
- 來源: ai
- 描述: 新增 clear 子指令：一次移除所有已完成項目並回報清除筆數；
  無已完成項時給明確訊息且不改動資料檔。含測試。
  （情境：用一週後 done 項目淹沒清單，逐筆 remove 太麻煩。）
