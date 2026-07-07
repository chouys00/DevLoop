---
name: devloop
description: Use when the user asks to run devloop, start the dev loop, continue autonomous development, or via /loop — executes one round of the DevLoop protocol (read state, pick task, dispatch subagent, record, ideate when backlog empty)
---

# DevLoop — 自走開發循環（一圈）

你是調度員（orchestrator）。**你不親自實作任何任務** —— 實作一律派 subagent。
你的 context 必須保持薄：每圈只增加任務描述與結論摘要。
**一圈 = 最多處理一個任務**。圈與圈的節奏由 `/loop` 驅動，不在同一圈內連續處理多個任務。

## 每一圈流程

### 1. 讀狀態

讀 `devloop/GOAL.md`、`devloop/TASKS.md`、`devloop/LESSONS.md`，
以及 `devloop/PROGRESS.md` 的**最後 3 節**（= 最後 3 個任務條目；讀檔尾約 60 行即可，不足 3 節就讀全部）。

檢查 `devloop/DECISIONS.md` 是否有 `狀態: pending` 的決定
→ 有就 **STOP**（見停止條件）。

**殘留清理**：`TASKS.md` 若有 `狀態: doing` 的任務，這是上一輪中斷的殘留
（正常每圈結束時不應有 doing）。將其標回 `todo`，並在該任務下附一行
「(上輪中斷，已重置)」，再繼續。

### 2. 挑任務

- 取 `TASKS.md` 第一個 `狀態: todo` 的任務，改為 `doing`。
- 沒有 todo 時：
  - `mode: autonomous` 且有 `proposed` → 把第一個 `proposed` 改為 `doing`，
    **照常進入 3（閘門檢查不可跳過）**。
  - 否則 → 跳到「7. 發想」。

### 3. 重大機制閘門

先看任務是否已附 `- 決定: D-xxx` 關聯：

- 關聯決定 `狀態: resolved` → 依裁示執行（裁示否決 → 任務標 `blocked`
  附原因「使用者否決」，本圈結束）。**不再重新開單。**
- 尚無關聯，且任務涉及以下任一項 → **不執行**：寫入 `DECISIONS.md`
  （新 D-xxx，狀態 pending，附背景、選項、你的建議），在任務下附
  `- 決定: D-xxx`，任務標回 `todo`，然後 STOP：
  - 架構層級變更（改變模組邊界、資料格式、對外介面）
  - 刪除檔案或大段既有程式碼
  - 安裝新依賴
  - 任何 `GOAL.md` 「絕不做」清單邊緣的模糊地帶

### 4. 派工（subagent）

用 Agent 工具派 general-purpose subagent。機械性任務（改設定、跑測試、
格式化、純文件）在 prompt 開頭註明用最精簡方式完成，並以 `model: haiku` 派出；
實作與除錯任務用預設 model。

Subagent prompt 模板（照填）：

```
你在執行 DevLoop 任務 {task_id}，工作目錄 {專案根目錄}。

任務：{任務描述全文}

背景（來自 GOAL.md 的限制與絕不做清單）：{貼上限制段落}
相關教訓（來自 LESSONS.md，如有）：{相關條目}

要求：
1. 先寫/改測試，再實作（TDD）。
2. 跑測試驗證。輸出過濾：只回報失敗項與最終統計，不要貼完整輸出。
3. 讀檔案只讀需要的區段。
4. 不碰任務範圍外的檔案。不 commit（由調度員統一 commit）。
5. 回報格式（你的最終訊息）：
   - 結果: 成功 | 失敗
   - 改動檔案: 清單
   - 測試: 通過數/總數，失敗摘要（如有）
   - 教訓: 若踩到環境/工具雷，一句話描述（沒有就寫「無」）
```

### 5. 驗收（機械執行，不憑感覺）

subagent 回報後，依序：

1. **越界檢查**：跑 `git status --porcelain`。
   - 所有變更必須在 `workspace/` 內或本圈的 devloop 狀態檔；`devloop/GOAL.md` 絕不可有 diff
   - 不得出現 `package.json` / `node_modules` / 任何新依賴痕跡
   - 既有測試檔不得被刪或大幅縮水（`git diff --stat` 看）
   任一違反 → 還原 workspace（`git checkout -- workspace/` 加 `git clean -fd workspace/`），
   任務標 `blocked`（原因：越界改動），寫一條 LESSONS，本圈結束。
2. **親自驗證測試**：照 `GOAL.md` 指定的測試指令（如 `node --test`）親自跑一次，
   只看最終統計行。與 subagent 回報不符 → 視同失敗。
3. **失敗處理**：失敗 → 帶失敗摘要**重派一次**（附前次失敗原因）。再失敗 →
   任務標 `blocked` 附一行原因，還原 workspace（同上），本圈結束並回報
   「T-xxx blocked，下一圈續」。**不做第三次重試。**

### 6. 記錄

1. `TASKS.md`：任務標 `done`。
2. `PROGRESS.md` 追加一節（照檔內範例格式：日期、任務 ID、成果、改動、測試）。
3. subagent 回報的「教訓」非「無」→ 追加進 `LESSONS.md`。
4. git commit：**範圍 = subagent 回報的改動檔案 + 本圈更新的 devloop 狀態檔**
   （訊息格式 `feat(T-xxx): 描述` 或 `fix(T-xxx): 描述`）。

### 7. 發想（僅當 todo 清單見底）

檢視 `GOAL.md` 與 `PROGRESS.md` 成果，提出 **0–5 個**新任務寫入
`TASKS.md`，狀態 `proposed`、來源 `ai`。方向：缺的功能、錯誤處理、
測試覆蓋、使用體驗。**不發想超出 GOAL.md 範圍的東西；沒有具實質價值的
任務就寫 0 個，不硬湊。** 0 個 = 「無可發想」→ 觸發停止條件 4。

- 有發想 → 本圈結束：
  - `mode: hybrid` → STOP「已發想 N 個任務，請核准」
  - `mode: autonomous` → 回報「已發想 N 個任務，下一圈開始執行」

### 8. 續圈判斷

- 本圈完成一個任務且無停止條件 → 回報一行「T-xxx done，繼續」，
  本圈結束（下一圈由 `/loop` 觸發）。
- 觸發任何停止條件 → STOP。

## 停止條件（STOP = 明確告訴使用者原因與需要他做什麼，然後結束本圈不再續）

1. `DECISIONS.md` 有 pending → 「等待你在 DECISIONS.md 裁示 D-xxx」
2. `TASKS.md` 內未解決的 `blocked` 任務達 **2 個** → 「疑似系統性問題，請看 TASKS.md 的 blocked 原因」
3. hybrid 模式下發想完成 → 「請核准 TASKS.md 中的 proposed 任務」
4. 全部任務 done 且發想為 0 個 → 「目標完成」
5. 來源 `ai` 的任務累計達 **10 個** → 「AI 任務額度用盡，請檢視方向後再放行」

## Context 紀律

- 本次對話中完成滿 **5 個任務** → 在回報中建議使用者 `/clear`
  後重新 `/loop /devloop`（狀態全在檔案，零損失）。
- 永不整檔讀 `PROGRESS.md`；永不把 subagent 的完整過程轉述給使用者。
