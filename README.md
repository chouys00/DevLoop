# DevLoop

讓 Claude Code 在本機自走執行開發任務的協定。給定目標與初始任務後，AI 以
「實作 → 檢討 → 發想 → 再實作」循環推進；日常自走，重大決定停下來等人審核。

## 架構

| 元件 | 位置 | 角色 |
|---|---|---|
| 狀態檔協定 | `devloop/` | 記憶（對話是暫時的，檔案是持久的） |
| devloop skill | `.claude/skills/devloop/SKILL.md` | 每一圈的行為規則 |
| devloop-goal skill | `.claude/skills/devloop-goal/SKILL.md` | 訪談生成 GOAL.md 與種子任務 |
| `/loop` | Claude Code 內建 | 循環引擎 |

## 使用方式

1. 對 Claude Code 說「幫我設定 devloop 目標」（觸發 `devloop-goal` 訪談，
   生成 `GOAL.md` 與種子任務；定稿後 GOAL.md 凍結，僅使用者可改）
2. 執行 `/loop /devloop`
3. AI 停下時：回覆 `devloop/DECISIONS.md` 的提問、核准 `TASKS.md` 的 `proposed` 任務
4. 進度看 `devloop/PROGRESS.md`

## 狀態檔

| 檔案 | 誰寫 | 內容 |
|---|---|---|
| `GOAL.md` | 訪談生成，定稿後僅使用者可改 | 大目標、用途與發想方向、限制、絕不做、模式旗標 |
| `TASKS.md` | AI | 任務清單（proposed/todo/doing/done/blocked） |
| `PROGRESS.md` | AI | 進度日誌（append-only） |
| `DECISIONS.md` | AI 問、使用者答 | 重大決定審核管道 |
| `LESSONS.md` | AI | 踩雷教訓，新 session 必讀 |

設計文件：`docs/superpowers/specs/2026-07-07-devloop-design.md`

## 範例參考

`examples/todo-cli-demo/` 是第一次端對端驗證的完整存底（示範用的
todo-cli 程式碼 + 對應的 GOAL/TASKS/PROGRESS/LESSONS 快照），僅供
參考 GOAL.md 怎麼寫、任務描述該多細，不是活動狀態，不影響現在的
`devloop/` 與 `workspace/`。
