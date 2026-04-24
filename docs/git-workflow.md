# Git 工作流程規範 (Git Workflow)

本文件定義本專案的 Git 使用規範。Agent 必須嚴格遵守，避免 commit 混亂或分支管理問題。

## 1. 分支策略（Branch Strategy）

- **main**：正式環境分支（Production）
  - 只能透過 Pull Request 合併
  - 必須通過所有測試與人類審核後才能合併

- **develop**：開發主分支（可選，如果專案變大再使用）

- **feature/xxx**：新功能開發分支（推薦使用）
  - 例如：feature/passenger-order-form
  - 例如：feature/driver-location-map

- **fix/xxx**：Bug 修復分支
  - 例如：fix/google-maps-pricing-calculation

- **chore/xxx**：其他維護工作（設定、文件更新等）

**命名規則**：分支名稱必須使用小寫英文 + 連字符（-），清晰描述目的。

## 2. Commit 規範（Conventional Commits）

每次 commit 訊息必須遵循以下格式：

<type>(<scope>): <描述>
範例：
feat(passenger): 新增訂車表單頁面
fix(driver): 修正司機位置更新錯誤
chore(docs): 更新 tasks.md
style(ui): 調整 Button 元件圓角
refactor: 重構訂單計價邏輯


常用 type：
- **feat**：新功能
- **fix**：Bug 修復
- **chore**：維護、文件、設定
- **style**：樣式調整
- **refactor**：重構程式碼
- **docs**：文件更新

## 3. 開發工作流程

1. 從 `main` 分支拉出新分支（feature/ 或 fix/）
2. 按照 `agent-protocols.md` 小步驟開發
3. 每完成一個小任務後：
   - 更新 `tasks.md` 狀態
   - 執行 `git add .`
   - 使用正確的 Conventional Commit 訊息 commit
   - `git push` 上傳分支
4. 功能完成後，開 Pull Request 合併回 `main` 或 `develop`
5. 合併前必須通過 `pnpm build` 與 `pnpm lint`

## 4. 禁止事項

- 禁止直接在 `main` 分支上修改程式碼
- 禁止使用模糊的 commit 訊息（如 "update"、"fixed"）
- 禁止一次 commit 大量未完成的功能
- 禁止不更新 tasks.md 就 commit

## 5. Stage Gate 要求

每個 Stage 結束時，必須：
- 所有變更 commit 完成
- 更新 tasks.md
- 執行 `pnpm build` 通過
- 建立 Pull Request 並請人類審核

## 版本紀錄
- 版本：v1.0
- 更新日期：2026/04/22
