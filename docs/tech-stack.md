# 技術棧文件 (Tech Stack)

## 1. 開發環境與工具
- **Node.js 版本**：v20 或更高版本（強烈建議使用 v22 LTS）
- **套件管理器**：pnpm（嚴禁使用 npm 或 yarn）
- **開發作業系統**：Windows（主要開發環境）
- **IDE**：Windsurf / Cursor（必須嚴格遵循本文件與 .cursorrules）

## 2. 前端核心框架
- **框架**：Nuxt 3（最新穩定版）
- **UI 框架**：Vue 3（Composition API）
- **開發模式**：全數使用 `<script setup>` + Composition API
- **語言**：TypeScript（嚴格模式 Strict Mode）
  - 必須開啟 `strict: true`、`noImplicitAny: true`
  - **嚴禁**使用 `any` 類型
  - 所有元件、函式、狀態、API 回應必須有明確型別定義

## 3. UI 與視覺設計
- **樣式框架**：Tailwind CSS（最新穩定版，建議搭配 `@nuxtjs/tailwindcss` 模組）
- **設計來源**：Google Stitch 產出的 `design.md`（The Editorial Horizon 設計系統）
- **規範要求**：
  - 必須先完整閱讀 `design.md`
  - 所有 Vue 元件與 Tailwind 類別必須嚴格遵循 design.md 中的色彩、圓角、間距、玻璃擬態、留白、不對稱佈局等規範
  - 禁止自行創作未定義的樣式或破壞「No-Line Rule」（禁止 1px 實線）

## 4. 狀態管理與資料獲取
- **狀態管理**：Pinia（搭配 `@pinia/nuxt` 模組）
- **API 請求**：優先使用 Nuxt 內建的 `$fetch` / `useFetch`
- **禁止**：未經更新 tech-stack.md 就安裝 axios 等額外 HTTP Client

## 5. 部署與程式碼託管
- **程式碼託管**：GitHub
- **部署平台**：Vercel（前端 + Nuxt Nitro Serverless Functions）
- **部署分支**：`main` 分支為正式環境

## 6. 後端架構（BFF）
- **後端實現**：Nuxt Nitro（`server/api/` 目錄）
- **資安鐵律**：所有外部 API 呼叫（Google Maps、LINE、航空 API 等）**必須**透過 Nitro Server API 轉發
  - **嚴禁**在客戶端（Vue 元件）直接呼叫或暴露任何金鑰
- **環境變數**：統一存放於 `.env`，使用 `useRuntimeConfig()` 存取

## 7. 資料庫與身份驗證
- **資料庫**：Firebase Firestore
- **身份驗證**：Firebase Auth（必須與 LINE LIFF 強綁定）
- **整合要求**：Firebase 配置透過 Nitro Server 安全處理，客戶端僅使用 SDK 進行必要操作

## 8. 多語系與國際化
- **模組**：@nuxtjs/i18n（官方推薦）
- **支援語言**：繁體中文（預設）、英文
- **策略**：預設語言為繁體中文（zh-TW），支援路由與翻譯檔管理
- **要求**：所有文案必須使用 i18n 管理，禁止硬編碼中文或英文

## 9. 外部服務與整合（目前已知）
- **LINE 整合**：LINE LIFF（登入）、LINE Bot（訊息推送）
- **地圖與定位**：Google Maps API（路線、距離、地理圍欄）
- **航班資訊**：航空 API（具體廠商尚未確定）
- **支付**：目前僅支援現金支付
- **其他**：可能包含氣象 API 等（未來新增需更新本文件）

## 10. 嚴格禁止與新增套件規則
- **禁止事項**：
  - 未更新 tech-stack.md 並經人類確認前，嚴禁安裝任何新套件或模組
  - 禁止在客戶端直接呼叫外部 API
  - 禁止使用 `any` 型別或繞過 TypeScript 嚴格檢查
- **新增套件流程**（包含航空 API 等尚未確定項目）：
  1. 更新本文件（tech-stack.md）
  2. 更新 tasks.md（新增相關任務）
  3. 更新 decision-log.md（記錄理由）
  4. 經人類確認後才能安裝與整合
- 任何「暫時想不到」的未來需求，都必須走此流程，不得直接在開發中臨時加入

## 版本紀錄
- 版本：v1.1（已補充模組與規則）
- 更新日期：2026/04/22

