# 專案目錄結構 (Folder Structure)

本文件定義專案完整的目錄結構與檔案命名規範。  
Windsurf / Agent **必須嚴格遵守**本結構，禁止擅自建立未定義的資料夾或檔案。若需要新增目錄，必須先更新本文件並經人類確認。

## 專案根目錄結構

project-root/                          # 專案名稱建議：DestinationAnywhere
├── .env                              # 環境變數（絕對禁止 commit 到 Git）
├── .env.example                      # 範例環境變數（可 commit）
├── .cursorrules                      # Windsurf / Cursor 強制規則
├── .gitignore
├── nuxt.config.ts                    # Nuxt 主要設定
├── tailwind.config.js                # Tailwind + 語義化顏色定義
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
│
├── docs/                             # 所有 MD 規則文件（專案大腦）
│   ├── prd.md
│   ├── tech-stack.md
│   ├── style-guide.md
│   ├── design.md                     # Google Stitch 產出的原始設計規範
│   ├── agent-protocols.md
│   ├── roadmap.md
│   ├── tasks.md
│   ├── folder-structure.md
│   ├── git-workflow.md
│   ├── testing-strategy.md
│   ├── api-contracts.md
│   ├── naming-conventions.md
│   └── decision-log.md
│
├── public/                           # 靜態資源（不會被 Nuxt 處理）
│   ├── favicon.ico
│   └── images/                       # 圖片、icon 等（若有）
│
├── server/                           # Nuxt Nitro 後端（BFF）
│   ├── api/                          # 所有 API 路由（必須在此處理外部 API）
│   │   ├── auth/                     # LINE 登入相關
│   │   ├── maps/                     # Google Maps 相關
│   │   ├── flight/                   # 航空 API 相關
│   │   ├── orders/                   # 訂單相關
│   │   └── drivers/                  # 司機相關
│   ├── middleware/                   # Nitro 中間件
│   └── utils/                        # 後端共用工具
│
├── components/                       # Vue 元件
│   ├── ui/                           # 原子元件（Button, Input, Card 等）- 純 UI
│   ├── layout/                       # 佈局元件（Header, Footer, Sidebar）
│   ├── passenger/                    # 乘客端專用元件
│   ├── driver/                       # 司機端專用元件
│   ├── admin/                        # 管理者端專用元件
│   └── common/                       # 共用元件
│
├── pages/                            # Nuxt 頁面路由（檔案即路由）
│   ├── passenger/                    # 乘客端頁面
│   │   ├── index.vue                 # 首頁 / 訂車入口
│   │   ├── order/                    # 訂單流程
│   │   └── history.vue
│   ├── driver/                       # 司機端頁面
│   │   ├── index.vue
│   │   └── tasks.vue
│   ├── admin/                        # 管理者後台頁面
│   └── [...slug].vue                 # 404 或其他
│
├── composables/                      # 可重用 Composition API 函式
│   ├── useAuth.ts
│   ├── useOrder.ts
│   └── useMap.ts
│
├── stores/                           # Pinia 狀態管理
│   ├── auth.ts
│   ├── order.ts
│   ├── driver.ts
│   └── ui.ts                         # UI 狀態（如 Dark Mode）
│
├── lib/                              # 共用工具函式與型別定義
│   ├── utils.ts
│   ├── constants.ts
│   └── types/                        # 全域 TypeScript 型別
│       ├── order.ts
│       ├── driver.ts
│       └── index.ts
│
├── i18n/                             # 多語系翻譯檔
│   ├── locales/
│   │   ├── zh-TW.json
│   │   └── en.json
│   └── config.ts
│
├── middleware/                       # Nuxt 前端路由守衛（auth 檢查等）
│
├── assets/                           # 需要 Nuxt 處理的靜態資源（CSS、圖片等）
│   └── css/
│       └── main.css                  # 全局樣式（若需要）
│
└── README.md



## 重要命名與使用原則

- **元件命名**：PascalCase + 功能前綴（例如 `UiButton.vue`、`PassengerOrderForm.vue`）
- **頁面路由**：使用資料夾結構對應 URL（例如 `/passenger/order`）
- **API 路由**：全部放在 `server/api/`，嚴禁在前端直接呼叫外部服務
- **敏感檔案**：`.env`、`*.key` 等絕對不 commit
- **docs/**：所有開發規則文件必須放在此處，並在 `.cursorrules` 中強制掛載

## 禁止事項
- 禁止在根目錄亂放檔案
- 禁止在 `components/` 直接建立深層資料夾（最多兩層）
- 禁止把後端邏輯寫在 `pages/` 或 `components/`
- 任何目錄結構變更必須先更新本文件並記錄在 `decision-log.md`

## 版本紀錄
- 版本：v1.0
- 更新日期：2026/04/22

