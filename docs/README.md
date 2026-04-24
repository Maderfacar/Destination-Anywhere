# DestinationAnywhere

台灣機場接送訂車平台

一個整合乘客、司機與管理者的機場接送預約系統。支援 LINE LIFF 快速登入、Google Maps 智慧計價、航班即時通知與司機位置追蹤。

---

## ✨ 專案特色

- 三端整合：乘客端、司機端、管理者端
- LINE LIFF 無縫登入 + LINE Bot 即時通知
- Google Maps 路線規劃與智慧計價
- 航班資訊整合（支援延誤通知）
- 地理圍欄限制（僅限台灣本島）
- 現代高級 UI（Glassmorphism + 大量留白）
- 完整支援 Light / Dark Mode
- 行動版優先設計

---

## 🚀 快速開始

### 1. 安裝依賴

```bash
pnpm install
2. 設定環境變數
Bash# 複製範例檔案
cp .env.example .env
請填入以下必要金鑰：

LINE LIFF ID
Firebase 設定
Google Maps API Key

3. 啟動開發伺服器
Bashpnpm dev
開啟瀏覽器訪問 http://localhost:3000

📁 專案結構
詳細目錄結構請參考 docs/folder-structure.md
主要目錄：

docs/ — 所有開發規則與文件（專案大腦）
components/ — Vue 元件
pages/ — 頁面路由（乘客、司機、管理者三端）
server/api/ — 後端 API（Nitro）
stores/ — Pinia 狀態管理


📋 開發規則與流程
請務必先閱讀以下核心文件：

prd.md — 專案需求與功能說明
tech-stack.md — 技術棧與限制
style-guide.md — 設計與樣式規範
agent-protocols.md — Agent 協作協議（最重要）
roadmap.md — 7 階段開發計劃
tasks.md — 任務清單與進度追蹤
.windsurfrules — Windsurf 強制規則

開發前必須完成 Stage 0：確認所有規則文件一致性。

🛠 常用指令
Bashpnpm dev          # 啟動開發模式
pnpm build        # 打包專案
pnpm lint         # 執行 ESLint
pnpm test         # 執行測試

📖 核心文件索引

核心文件索引

文件用途prd.md專案需求與功能範圍tech-stack.md技術棧與禁止事項style-guide.md設計規範與 Tailwind 規則agent-protocols.mdAgent 行為規範與防鬼打牆roadmap.md開發階段與時間規劃tasks.md任務清單與進度追蹤git-workflow.mdGit commit 與分支規範naming-conventions.md命名規範decision-log.md重要決策紀錄testing-strategy.md測試策略api-contracts.mdAPI 介面定義


⚠️ 注意事項

所有外部 API 金鑰必須透過 Nitro Server 轉發，嚴禁在前端暴露
新增任何套件或功能前，必須先更新 tech-stack.md 與 decision-log.md
嚴格遵循 Conventional Commits 進行 commit
每次修改後請更新 tasks.md 對應狀態


專案狀態：Stage 0 規則建立階段（進行中）

版本紀錄

版本：v1.0
更新日期：2026/04/22
