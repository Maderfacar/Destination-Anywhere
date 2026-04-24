# 測試策略 (Testing Strategy)

本文件定義 DestinationAnywhere 專案的測試規範與策略。Agent 必須遵守本文件，避免只開發功能而不測試。

## 1. 測試原則

- **測試先行思維**：重要功能應先思考如何測試，再開始實作
- **多層級測試**：從元件層級到整合層級逐步測試
- **行動版優先**：所有測試必須涵蓋手機尺寸
- **Dark Mode 測試**：重要元件需同時測試 Light / Dark 兩種模式
- **Stage Gate 要求**：每個 Stage 結束前必須通過相關測試

## 2. 測試類型與工具

| 測試類型         | 工具                  | 負責範圍                          | 執行頻率       |
|------------------|-----------------------|-----------------------------------|----------------|
| Unit Test        | Vitest + @vue/test-utils | 單一元件、工具函式、計算邏輯     | 每次 commit   |
| Component Test   | Vitest + @vue/test-utils | 元件渲染、互動、樣式             | Stage 2 後    |
| Integration Test | Vitest + MSW          | API 呼叫、Pinia 狀態、表單流程   | Stage 4 後    |
| E2E Test         | Playwright            | 完整使用者流程（訂車 → 通知）    | Stage 5 後    |

## 3. 測試覆蓋率要求

- **整體覆蓋率**：暫定 ≥ 70%（後續可提高）
- **關鍵路徑**：訂單建立、計價計算、登入流程 → 必須 100% 覆蓋
- **UI 元件**：原子元件（UiButton、UiInput 等）→ 必須有快照測試或視覺測試

## 4. 各 Stage 測試要求

**Stage 2（原子元件）**
- 每個 Ui 元件必須有基本渲染測試
- 測試不同 props、狀態、Dark Mode

**Stage 3（佈局與靜態頁面）**
- 測試頁面是否正確渲染
- 測試路由切換是否正常

**Stage 4（邏輯實作）**
- 測試表單驗證、計價邏輯、狀態管理
- 測試 Google Maps 相關計算函式

**Stage 5（資料串接）**
- 使用 MSW 模擬 API 測試前端整合
- 測試 Nitro API 端點（後端測試）
- 測試 LINE Bot 通知觸發邏輯

**Stage 6（測試與優化）**
- 執行完整 E2E 測試
- 進行行動版與不同裝置測試

## 5. 測試命名與檔案位置

- 測試檔案命名：`xxx.test.ts` 或 `xxx.spec.ts`
- 元件測試放在 `__tests__` 資料夾內，或與元件同層
- 範例：`components/ui/UiButton.test.ts`

## 6. 禁止事項

- 禁止只寫功能不寫測試
- 禁止在測試中使用 `any` 類型
- 禁止跳過關鍵路徑測試
- 禁止使用不穩定的測試（flaky test）

## 7. 執行指令

- 單元測試：`pnpm test`
- 測試覆蓋率：`pnpm test:coverage`
- E2E 測試：`pnpm test:e2e`

## 版本紀錄
- 版本：v1.0
- 更新日期：2026/04/22
