# LESSONS

<!-- 踩雷教訓：環境問題、依賴陷阱、反覆犯的錯。新 session 開場必讀。保持精簡，過時就刪。 -->

- 目錄無 package.json 時，Node 22 預設把 `.js` 當 CommonJS —— todo-cli 全案採 CJS（require/module.exports），不要混用 ESM。
- 專案路徑含中文：跑指令一律用 PowerShell（Git Bash 會把路徑編碼弄壞）。
