# Agent 協作協議 (Agent Protocols)

這是本專案的「警察規則」。Windsurf / 任何 LLM Agent **必須嚴格遵守**本文件中的所有規定。  
違反本文件視為嚴重錯誤，連續違反 2 次必須立即停止並要求人類介入。

## 1. 每次回應必須遵守的思考格式（禁止跳過）

每次開始回應前，**必須**先按照以下格式思考並輸出：

```markdown
[Current Stage]：例如 Stage 2 - 基礎原子組件開發

[Context Refresh]
- 目前開發階段？
- 已完成的主要任務？
- 下一個具體子任務是什麼？
- tasks.md 中對應的項目狀態？

[Rule Reference]
- 本次變更主要參考哪些 MD 文件？（至少引用 2 個以上）
- 特別引用的段落或規則？

[Plan]
- 受影響的檔案清單（必須先確認檔案已存在）
- 本次變更的具體小步驟（一次最多修改 2 個檔案）
- 預計會用到的技術或元件

[Risk & Verification]
- 可能影響哪些地方？
- 如何驗證本次變更？（build / lint / 手動檢查 / Dark Mode）

[Stop Loss Check]
- 本次是否為同一個錯誤的第幾次嘗試？



2. 核心鐵律（必須絕對遵守）

任務追蹤鐵律
每完成一個子任務，必須立即更新 tasks.md 中對應的狀態（✅ 已完成 / 🔄 進行中 / ⏳ 未開始）
更新後必須執行 commit

小步驟原則
一次最多修改 2 個檔案
禁止一次大改多個檔案或整個功能
改完立即 build 並檢查錯誤

Stop Loss 機制（鬼打牆防護）
同一個錯誤或問題連續出現 2 次 → 立即停止操作
列出已嘗試的所有方法
要求人類介入並提供建議
禁止繼續重複嘗試

檔案與目錄鐵律
必須完全遵守 folder-structure.md
禁止擅自建立未定義的資料夾或檔案
禁止「我認為應該有這個檔案」→ 必須先列出目前實際檔案清單確認

技術變更鐵律
禁止未更新 tech-stack.md 就安裝新套件、模組或外部 API
新增任何套件（包含航空 API、i18n 細部設定等）必須：
更新 tech-stack.md
更新 tasks.md
更新 decision-log.md
經人類確認後才能執行

樣式與設計鐵律
所有樣式必須嚴格遵守 style-guide.md 與 design.md
禁止自行創作 Tailwind 類別或破壞 No-Line Rule

TypeScript 鐵律
嚴禁使用 any 類型
所有變數、元件 props、API 回應必須有明確型別

3. 階段開發紀律

必須嚴格按照 roadmap.md 定義的 7 個 Stage 循序執行
禁止跨 Stage 跳躍開發（例如還在 Stage 2 就開始寫 Stage 5 的 API）
每個 Stage 結束前必須通過 Stage Gate（build + lint + tasks.md 更新）

4. 人類介入點

Stage 0 結束時
每個 Stage Gate
鬼打牆連續 2 次
新增重要套件或技術變更
Agent 認為有重大決策需要確認時

5. 通用禁止事項

禁止使用縮寫或模糊代碼註解
禁止幻想不存在的檔案或 API
禁止在客戶端直接呼叫外部 API（必須走 Nitro server/api）
禁止硬編碼敏感資訊

版本紀錄

版本：v1.0
更新日期：2026/04/22

