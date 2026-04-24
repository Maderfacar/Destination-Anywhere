# 樣式指南 (Style Guide)

本文件將 Google Stitch 產出的 design.md（The Editorial Horizon）轉譯為 Tailwind CSS + Vue 元件開發的具體執行規則。  
Windsurf / Agent 必須**嚴格遵守**本文件，禁止自行創作樣式。

## 1. 核心設計原則（來自 design.md）
- **核心北極星**：通透、呼吸、權威
- **大量留白**：每個組件都要有充足呼吸空間
- **非對稱美學**：在網格內大膽使用不對稱留白
- **No-Line Rule**：**嚴禁**使用 1px 純色實線分割區塊（改用背景色階切換或色調差異）
- **玻璃擬態（Glassmorphism）**：浮動元素使用半透明 + backdrop-blur
- **行動版優先**：所有樣式預設以手機尺寸為基準開發（mobile-first），僅在必要時使用 md: / lg: 斷點

## 2. 色彩系統（Semantic + Hex 對應）
採用語義化顏色變數，對應 design.md 指定的 Hex 值：

- **background** → `#F8F9FA`（極輕微暖白）
- **primary** → `#051125`（深沉午夜藍）
- **secondary** → `#47607E`（煙燻藍）
- **surface** → 基礎表面色
- **surface-container-low / lowest / highest** → 用於色調堆疊（Tonal Layering）
- **on-primary** → `#FFFFFF`
- **on-surface** → 主要文字顏色

**Tailwind 使用方式**：
- 優先使用語義化類別：`bg-primary`、`text-on-primary`、`bg-surface-container-low` 等
- 在 `tailwind.config.js` 中定義這些語義化顏色，並對應到 design.md 的 Hex 值
- 支援 Dark Mode 時，只需修改變數值即可切換配色

**玻璃擬態統一類別**：
- `glass`：半透明背景 + `backdrop-blur(20px)`
- `glass-card`：用於卡片、彈窗、側邊欄等浮動元素

## 3. 字體排印（Typography）
- **標題 / Display（Headline）**：Manrope（幾何感強、無襯線）
  - 使用 `@nuxtjs/google-fonts` 模組載入
  - 字重：600 (Semi-Bold)
- **內文 / Title / Label / Body**：Inter
  - 字重：400 (Regular)、500 (Medium)
- **繁體中文優化**：
  - 行高（line-height）：1.6 ~ 1.8
  - 避免過緊的字距

**禁止**：硬編碼字體家族或未使用 i18n 的文案。

## 4. 間距與圓角（維持 design.md px 值）
- **圓角**：
  - 一般元件 / 按鈕：16px（`rounded-[16px]` 或自訂 `rounded-2xl`）
  - 卡片 / 大容器：32px（`rounded-[32px]` 或自訂 `rounded-3xl`）
- **間距原則**：大量使用 1.5rem (24px) 以上垂直間距
- **留白原則**：不要害怕空白，讓每個區塊都有充足呼吸空間

## 5. 組件具體規範
### 按鈕 (Buttons)
- **Primary Button**：`bg-primary text-on-primary`，圓角 16px
  - Hover：透明度增加 10%
  - Active：scale-98
- **Secondary (Glass) Button**：`glass` 類別 + 半透明 surface
- 禁止使用標準邊框，改用玻璃效果或色調差異

### 卡片 (Cards)
- 圓角統一 32px
- **嚴禁**使用分割線（<hr> 或 border）
- 使用垂直間距（≥24px） + 背景色階切換區分內容
- 頂層卡片使用 `surface-container-highest`

### 輸入欄位 (Inputs)
- 底色：`surface-container-highest`
- **不設邊框**（或使用極細鬼影邊框）
- 焦點狀態：僅顯示 2px `primary` 底線或極細 ghost border

### 陰影與深度
- 浮動陰影：`blur(40px)`、`spread(-10px)`，透明度 4%~8%
- 鬼影邊框（必要時）：10%~20% 透明度

## 6. Dark Mode 支援
- 使用 Tailwind `dark:` variant（class 策略：在 html 或 body 上切換 `dark` class）
- 必須為所有主要顏色定義 Dark Mode 對應值（深色背景、反轉文字顏色、調整玻璃透明度）
- 玻璃擬態在 Dark Mode 下需調整透明度與 blur 以維持通透感
- 所有元件開發時必須同時考慮 Light / Dark 兩種模式

## 7. 行動版優先原則
- 所有樣式**預設針對手機尺寸**開發
- 只在必要時新增 `md:`、`lg:` 等斷點
- 確保按鈕、輸入框在小螢幕上有足夠可點擊區域（至少 44px）

## 8. Do's and Don'ts
**✅ Do's**
- 大量留白與呼吸空間
- 使用語義化顏色類別
- 行動版優先開發
- 玻璃效果必須服務於資訊層級
- 同時支援 Light / Dark Mode

**❌ Don'ts**
- 禁止 1px 純色實線（No-Line Rule）
- 禁止使用純黑色（改用 primary 或 inverse-surface）
- 禁止硬編碼 Hex 顏色（除非在 tailwind.config.js 中定義）
- 禁止過度裝飾或破壞簡潔感

## 9. 其他規範
- 任何新樣式或變更必須先更新本文件
- 所有 Tailwind 類別必須能對應到 design.md 的描述

## 版本紀錄
- 版本：v1.0
- 更新日期：2026/04/22
