# 專案任務清單 (Project Tasks & Backlog)

**總進度**：Stage 0 / 7  
**已完成任務**：0/48  
**最後更新**：2026/04/22

---

## Stage 0：需求與規則最終確認（The Constitution）
（此階段無需開瀏覽器，主要用文字確認）

- [ ] 完成 prd.md 撰寫與確認
- [ ] 完成 tech-stack.md 撰寫與確認
- [ ] 完成 style-guide.md 撰寫與確認
- [ ] 完成 folder-structure.md 撰寫與確認
- [ ] 完成 agent-protocols.md 撰寫與確認
- [ ] 產生 tasks.md 初稿並經人類審核
- [ ] 完成 .cursorrules 撰寫與確認
- [ ] 一致性檢查報告（所有 MD 文件無衝突）

## Stage 1：環境初始化與規則設定（The Law）
**驗證時機**：Stage 1 完成後立即

- [ ] 建立 Nuxt 3 專案
- [ ] 初始化 Git 並設定 .gitignore
- [ ] 安裝核心套件（Tailwind、TypeScript、Pinia、i18n 等）
- [ ] 設定 Firebase 與 LINE LIFF 基礎配置
- [ ] 建立所有 docs/ MD 規則檔案
- [ ] 設定 .env.example
- [ ] **驗證**：執行 `pnpm dev`，開瀏覽器看到 Nuxt 預設歡迎頁面即算通過

## Stage 2：基礎原子組件開發（The Atoms）
**驗證時機**：每完成 3~4 個元件後

- [ ] 建立 UiButton 元件（支援 Primary / Secondary / Glass）
- [ ] 建立 UiInput、UiSelect、UiCard 等基礎表單元件
- [ ] 建立 UiModal、UiToast 等常用元件
- [ ] 所有元件支援 Light / Dark Mode 並遵循 style-guide.md
- [ ] **驗證**：建立一個臨時的 `components-showcase.vue` 頁面，把做好的原子元件都放上去，在瀏覽器中檢查樣式是否正確

## Stage 3：佈局與靜態頁面（The Shell）
**驗證時機**：此階段可頻繁開瀏覽器驗證（從這裡開始看得最明顯）

- [ ] 建立主要 Layout（Header、Footer、Navigation）
- [ ] 建立乘客端頁面框架（/passenger/*）
- [ ] 建立司機端頁面框架（/driver/*）
- [ ] 建立管理者端頁面框架（/admin/*）
- [ ] 實作路由切換與基本導覽
- [ ] **驗證**：開瀏覽器切換不同頁面，確認整體佈局與導航是否正常

## Stage 4：邏輯實作與狀態管理（The Logic）

- [ ] 實作 LINE LIFF 登入流程
- [ ] 實作 Pinia 狀態管理
- [ ] 實作訂單建立表單邏輯與計價功能
- [ ] 實作訂單歷史查詢

## Stage 5：資料串接與持久化（The Soul）

- [ ] 建立 Nitro 後端 API
- [ ] 串接 Firebase Firestore
- [ ] 整合 Google Maps API 與地理圍欄
- [ ] 整合航空 API 與 LINE Bot 通知

## Stage 6：測試、優化與部署準備（The Polish）

- [ ] 撰寫測試
- [ ] 行動版與 Dark Mode 完整測試
- [ ] 部署至 Vercel

## Stage 7：維護與迭代（The Evolution）

- [ ] 建立後續迭代流程

---

**使用規則**
- 每完成一個子任務後，必須立即更新狀態（[ ] → [✅] 或 [🔄]）
- 每次更新 tasks.md 後請執行 git commit
- **驗證建議**：Stage 1 結束後即可開 `pnpm dev` 驗證；Stage 2 建議建立展示頁；Stage 3 開始可頻繁在瀏覽器中檢查。

**版本紀錄**
- 版本：v1.1（新增驗證時機說明）
- 更新日期：2026/04/22