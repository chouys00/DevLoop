# DevLoop

讓 Claude Code 在本機自走執行開發任務的協定。給定目標與初始任務後，AI 以
「實作 → 檢討 → 發想 → 再實作」循環推進；日常自走，重大決定停下來等人審核。

## 架構

| 元件 | 位置 | 角色 |
|---|---|---|
| 狀態檔協定 | `devloop/` | 記憶（對話是暫時的，檔案是持久的） |
| devloop skill | `.claude/skills/devloop/SKILL.md` | 每一圈的行為規則 |
| `/loop` | Claude Code 內建 | 循環引擎 |

## 使用方式

1. 編輯 `devloop/GOAL.md` 寫下目標（與 `mode: hybrid` 或 `mode: autonomous`）
2. 在本目錄開 Claude Code，執行 `/loop /devloop`
3. AI 停下時：回覆 `devloop/DECISIONS.md` 的提問、核准 `TASKS.md` 的 `proposed` 任務
4. 進度看 `devloop/PROGRESS.md`

## 狀態檔

| 檔案 | 誰寫 | 內容 |
|---|---|---|
| `GOAL.md` | 使用者 | 大目標、限制、絕不做清單、模式旗標 |
| `TASKS.md` | AI | 任務清單（proposed/todo/doing/done/blocked） |
| `PROGRESS.md` | AI | 進度日誌（append-only） |
| `DECISIONS.md` | AI 問、使用者答 | 重大決定審核管道 |
| `LESSONS.md` | AI | 踩雷教訓，新 session 必讀 |

設計文件：`docs/superpowers/specs/2026-07-07-devloop-design.md`
