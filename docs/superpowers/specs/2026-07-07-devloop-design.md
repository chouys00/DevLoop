# DevLoop 設計文件

日期：2026-07-07
狀態：已實作（驗證見 plan Task 5/6）

## 目的

DevLoop 是一套讓 Claude Code 在本機自走執行開發任務的協定。使用者給出目標與初始任務後，AI 以「實作 → 自我檢討 → 發想新任務 → 再實作」的循環持續推進，日常運作不需人工介入，僅在重大決定與里程碑時停下等候審核。

同時作為學習專案：實際體驗業界 agent 系統的核心手法 —— 記憶外部化、harness 驅動、subagent 隔離、context 成本控管。

## 設計原則

1. **對話是暫時的，檔案是持久的** —— 一切狀態以檔案為準，對話可隨時丟棄（`/clear`）而零損失。
2. **主對話只當調度員** —— 實作細節一律派給 subagent，主 context 每圈只增加任務描述與結論摘要。
3. **人在迴路於重大機制** —— 日常自走；架構變更、刪檔、新依賴、對外介面變更必停。

## 架構

由三部分組成：

- **狀態檔協定**（記憶）：`devloop/` 目錄下五個 markdown 檔
- **devloop skill**（行為規則）：`.claude/skills/devloop/SKILL.md` 定義每一圈流程
- **`/loop` 驅動**（引擎）：Claude Code 內建循環機制反覆觸發 skill

```
D:\練習\DevLoop\
├── .claude/
│   └── skills/
│       └── devloop/
│           └── SKILL.md          ← 每一圈的行為規則
├── devloop/
│   ├── GOAL.md                   ← 大目標（使用者寫，AI 不改）
│   ├── TASKS.md                  ← 任務清單與狀態
│   ├── PROGRESS.md               ← 進度日誌（append-only）
│   ├── DECISIONS.md              ← 待使用者審核的重大決定
│   └── LESSONS.md                ← 踩雷教訓，跨 session 傳承
├── docs/superpowers/specs/       ← 設計文件
└── workspace/                    ← 實際開發的專案放這裡
```

## 狀態檔協定

| 檔案 | 誰寫 | 內容 |
|---|---|---|
| `GOAL.md` | 使用者 | 專案大目標、限制條件、「絕不做」清單、模式旗標 |
| `TASKS.md` | AI | 任務清單。每項有：ID、描述、狀態、來源（`human`/`ai`） |
| `PROGRESS.md` | AI | 每完成一任務 append：做了什麼、改了哪些檔、測試結果 |
| `DECISIONS.md` | AI 提問、使用者回答 | 重大決定的提案與裁示，「停下來問人」的正式管道 |
| `LESSONS.md` | AI | 踩過的雷（環境問題、依賴陷阱），新 session 開場必讀 |

### 任務狀態機

`proposed` →（使用者核准）→ `todo` → `doing` → `done` / `blocked`

- AI 發想的新任務一律先進 `proposed`，使用者核准後改 `todo` 才會被執行（混合模式）。
- **自主模式**：`GOAL.md` 內寫 `mode: autonomous` 時，`proposed` 任務免核准直接可執行，但仍受重大機制閘門約束。預設為 `mode: hybrid`。

## 每一圈的流程（skill 定義）

1. **讀狀態**：`GOAL.md` + `TASKS.md` + `LESSONS.md`（+ `PROGRESS.md` 最後幾條）
2. **挑任務**：取第一個 `todo`；若清單空 → 進入發想階段（步驟 7）
3. **檢查閘門**：任務涉及重大機制（架構變更、刪檔、裝新依賴、改對外介面）→ 寫入 `DECISIONS.md`，停下等使用者
4. **派工**：任務 + 相關 context 交給 subagent 執行（subagent 負責：實作 → 跑測試 → 回報結論與改動清單）
5. **驗收**：主對話確認 subagent 回報的測試結果
6. **記錄**：更新 `TASKS.md`、append `PROGRESS.md`、git commit
7. **發想**（若 `TASKS.md` 見底）：檢視現有成果，提出 3–5 個新任務進 `proposed`
8. **續圈判斷**：還有 `todo` 且未觸發閘門 → 下一圈；否則停下回報

## Context 與額度控管

- **所有實作走 subagent**：細節 context 用完即棄，主對話保持薄。
- **機械任務降級**：簡單任務（改設定、跑測試、格式化）派 Haiku 級 subagent。
- **輸出紀律**：subagent 須過濾指令輸出（只看失敗項）、只讀必要檔案區段。
- **重開機制**：每完成 5 個任務，skill 主動建議使用者 `/clear` 重開；狀態全在檔案，重開零損失。
- **緊湊執行**：loop 連續跑以命中 prompt cache（5 分鐘 TTL）。

## 錯誤處理

- subagent 失敗（測試不過、卡住）→ 重試一次；再失敗 → 任務標 `blocked` 附原因，跳下一任務，不無限重試。
- 同一圈連續 2 個任務 `blocked` → 停下回報（代表環境或方向有系統性問題）。
- 每任務完成即 git commit → 隨時可回滾。

## 使用者操作介面

1. **啟動**：專案目錄開 Claude Code，下 `/loop /devloop`
2. **審核**：AI 停下時，回覆 `DECISIONS.md` / 核准 `proposed` 任務
3. **觀察**：看 `PROGRESS.md` 即知進度

## 驗證方式

以小而真實的開發目標（如「CLI 待辦事項工具」）讓 DevLoop 跑 3–5 圈，驗證：

- 任務被逐一完成、狀態檔正確更新
- 清單見底時發想階段提出合理新任務
- 重大機制任務會停下詢問
- `/clear` 重開後能無縫接續

## 未來方向（不在本次範圍）

- hooks 強制紀律（Stop hook 檢查 PROGRESS.md 更新、自動 commit）—— 適合作為 DevLoop 自舉的第一批任務
- headless（`claude -p`）膠水腳本模式
