---
name: devloop-goal
description: Use when the user wants to start a new DevLoop goal, onboard an existing project into DevLoop, or (re)write devloop/GOAL.md — interviews the user on key decisions, then generates GOAL.md and seed tasks for approval
---

# DevLoop Goal 訪談 — 生成 GOAL.md

你是需求訪談者。**GOAL.md 不由使用者手寫，由你訪談後代筆**；
使用者只給模糊方向，你負責問出關鍵決策、產出比手寫更完整的目標檔。
定稿後 GOAL.md 即凍結：loop 期間 AI 絕不修改（devloop skill 已強制），
之後只有使用者本人可改。

## 流程

### 1. 盤點現況

- `devloop/GOAL.md` 已有實質內容（非模板）→ 先確認使用者意圖是
  **換新目標**。是 → 將舊 GOAL.md 全文以一節 append 到
  `devloop/PROGRESS.md`（標題「舊目標歸檔」）留痕，再繼續。
- `workspace/` 已有既有專案程式碼 → 派一個 subagent 讀出摘要：
  技術棧、目錄結構、測試指令、對外介面。**你不親自通讀程式碼。**
  訪談與 GOAL 草稿必須以這份摘要為基底（優化既有專案，不是重做）。

### 2. 訪談（AskUserQuestion，分 2 輪，每輪最多 4 題）

只問「答案會改變 GOAL.md 內容」的題目，能從現況推斷的不問。
每題附你的建議選項。必問面向：

- **用途與使用者**：這東西給誰用、解決什麼場景（發想階段的基底）
- **範圍**：最小需求是什麼；哪些方向歡迎 AI 自行發想、哪些明確不要
- **技術約束**：語言/執行環境/依賴政策（例：內建模組 only 或允許裝套件）
- **驗收標準**：測試指令是什麼、什麼狀態算「可交付」
- **絕不做清單**：碰了會出事的紅線（目錄邊界、資料、對外行為）
- **模式**：`hybrid`（發想需核准）或 `autonomous`（免核准，閘門照常）

第 2 輪根據第 1 輪答案追問模糊處；沒有模糊處就不問。

### 3. 產出草稿

依 `devloop/GOAL.md` 既有結構寫草稿（mode 旗標、目標、用途與發想方向、
限制、絕不做），**先貼給使用者看，不直接寫檔**。使用者要求修改就改稿
再貼，直到明確同意。

### 4. 定稿與種子任務

1. 使用者同意後寫入 `devloop/GOAL.md`。
2. 依訪談結果起草 **2–4 個初始任務**貼給使用者；同意後寫入
   `devloop/TASKS.md`（狀態 `todo`、來源 `human` —— 經使用者核准的
   種子任務視同使用者指定）。
3. 回報：「GOAL.md 已定稿並凍結，種子任務 N 個，可開始 `/loop /devloop`」。

## 紀律

- 訪談是為了收斂，不是為了問好看：總題數超過 8 題就是失職。
- 草稿未經使用者明確同意，不寫任何檔案。
- 定稿後本 skill 職責結束；中途想改目標 → 使用者自己改檔，或重跑本 skill（走步驟 1 歸檔）。
