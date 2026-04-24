# DestinationAnywhere 專案規則文件總覽

專案名稱：**DestinationAnywhere**  
類型：台灣機場接送訂車平台  
開發模式：人類 + Windsurf Agent 共同開發

---

## 📋 已完成的核心文件清單（Stage 0）

| 檔案名稱                    | 用途說明                              | 狀態    |
|-----------------------------|---------------------------------------|---------|
| prd.md                      | 專案需求與功能範圍                    | ✅ 完成 |
| tech-stack.md               | 技術棧與嚴格限制                      | ✅ 完成 |
| style-guide.md              | 設計規範與 Tailwind 規則              | ✅ 完成 |
| design.md                   | Google Stitch 原始設計規範            | ✅ 完成 |
| folder-structure.md         | 專案目錄結構                          | ✅ 完成 |
| agent-protocols.md          | Agent 協作協議（防鬼打牆）            | ✅ 完成 |
| roadmap.md                  | 7 階段開發計劃                        | ✅ 完成 |
| tasks.md                    | 任務清單與進度追蹤                    | ✅ 完成 |
| git-workflow.md             | Git commit 與分支規範                 | ✅ 完成 |
| naming-conventions.md       | 命名規範                              | ✅ 完成 |
| decision-log.md             | 重要技術決策紀錄                      | ✅ 完成 |
| testing-strategy.md         | 測試策略                              | ✅ 完成 |
| api-contracts.md            | API 介面與型別定義                    | ✅ 完成 |
| README.md                   | 專案總說明與快速開始                  | ✅ 完成 |
| .windsurfrules              | Windsurf 強制規則總控                 | ✅ 完成 |
| .env.example                | 環境變數範例                          | ✅ 完成 |

---

## 🎯 目前專案階段

**目前階段：Stage 0 - 需求與規則最終確認**

所有核心規則文件已建立完成。

**下一步行動建議：**

1. **人類最終審核**（請你花一點時間檢查所有 MD 檔案是否都符合你的預期）
2. 確認無誤後，正式進入 **Stage 1**：建立實際 Nuxt 3 專案
3. 在 Stage 1 中，Agent 會根據 `tech-stack.md` 與 `folder-structure.md` 建立專案結構與基礎設定

---

## 📌 使用提醒

- 每次與 Windsurf 對話前，Agent 會自動讀取 `.windsurfrules`
- 每次回應開頭必須顯示 `[Current Stage]` 與任務狀態
- 任何新增套件、修改設計、調整功能，都必須先更新對應 MD 文件並記錄在 `decision-log.md`
- 開發時請嚴格按照 `roadmap.md` 與 `tasks.md` 推進

---

---

**版本紀錄**
- 版本：v1.0
- 更新日期：2026/04/22
- 建立者：Grok
