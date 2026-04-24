# 命名規範 (Naming Conventions)

本文件定義專案中所有檔案、元件、變數、函式、路由的命名規則。  
Agent 必須嚴格遵守，保持程式碼風格一致。

## 1. 檔案與目錄命名規則

- **目錄名稱**：小寫英文 + 連字符（-）
  - 範例：`passenger-order`, `driver-location`
- **檔案名稱**：
  - Vue 元件：PascalCase（大駝峰） + `.vue`
    - 範例：`UiButton.vue`, `PassengerOrderForm.vue`, `DriverTaskCard.vue`
  - TypeScript 檔案：camelCase（小駝峰） + `.ts`
    - 範例：`useOrder.ts`, `orderUtils.ts`
  - 翻譯檔：小寫 + 連字符
    - 範例：`zh-TW.json`, `en.json`

## 2. 元件命名規範（Components）

- **原子元件**（ui/ 資料夾）：`Ui` 前綴 + PascalCase
  - 範例：`UiButton.vue`, `UiInput.vue`, `UiCard.vue`, `UiModal.vue`
- **業務元件**：功能前綴 + PascalCase
  - 乘客端：`PassengerXXX.vue`（例：`PassengerOrderForm.vue`）
  - 司機端：`DriverXXX.vue`（例：`DriverTaskList.vue`）
  - 管理者端：`AdminXXX.vue`（例：`AdminOrderManagement.vue`）
- **共用元件**：`CommonXXX.vue` 或直接描述功能

## 3. 變數與函式命名規範

- **變數 / 狀態**：camelCase（小駝峰）
  - 範例：`orderList`, `currentDriverLocation`, `isLoading`
- **函式 / 方法**：camelCase + 動詞開頭
  - 範例：`calculateFare()`, `fetchOrderHistory()`, `updateDriverLocation()`
- **常量**：全大寫 + 底線分隔
  - 範例：`MAX_PASSENGERS`, `DEFAULT_LANGUAGE`
- **Boolean 變數**：以 `is`、`has`、`should` 開頭
  - 範例：`isLoggedIn`, `hasValidRoute`

## 4. 路由與頁面命名規範

- **頁面檔案**（pages/ 資料夾）：小寫 + 連字符
  - 範例：`passenger/order.vue`, `driver/tasks.vue`
- **路由路徑**：小寫 + 連字符
  - 範例：`/passenger/order`, `/driver/tasks`

## 5. TypeScript 型別命名規範

- **介面 / 型別**：PascalCase + `Interface` 或 `Type` 後綴（可省略）
  - 範例：`Order`, `DriverLocation`, `ApiResponse`
- **Enum**：PascalCase
  - 範例：`OrderStatus`, `VehicleType`

## 6. 禁止事項

- 禁止使用中文作為變數、函式、檔案名稱
- 禁止使用縮寫（除非是業界常見如 `id`, `url`, `api`）
- 禁止使用單字母變數（`x`, `i`, `j` 等），除非在迴圈中使用
- 禁止不同風格混用（例如同時出現 camelCase 和 snake_case）

## 7. 通用原則

- 名稱必須清晰且具有描述性
- 優先使用完整單字而非縮寫
- 同一類型的命名要保持一致
- 新增命名規則時，必須先更新本文件

## 版本紀錄
- 版本：v1.0
- 更新日期：2026/04/22
