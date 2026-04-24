---
description: 初始化專案架構（Agent Skills 版）
---

# 專案初始化

> 掃描專案並生成 `.windsurf/skills/` 與 `.memory/` 知識庫結構。

---

## 🔴 核心原則

1. **Skills 系統**：技能指令存放於 `.windsurf/skills/`，可按需載入
2. **知識統一**：所有專案知識統一存於 `.memory/context/`（跨 AI 工具共享）
3. **專案分析先行**：先分析專案結構，再生成適合的知識文件

---

## 目錄結構

```
.windsurf/
├── skills/                     # Agent Skills（僅存行為指令）
│   └── project-knowledge/      # 專案知識庫管理
│       ├── SKILL.md            # AI 行為指令（不存知識內容）
│       ├── templates/          # 初始化參考模板
│       └── scripts/            # 輔助腳本
└── workflows/                  # 工作流程

.memory/
├── context/                    # 專案知識（跨 AI 工具共享）
│   ├── INDEX.md               # 快速索引（必讀入口）
│   ├── architecture.md        # 目錄結構、分層設計
│   ├── modules.md             # 功能模組清單
│   ├── tech-decisions.md      # 技術決策記錄
│   ├── entry-points.md        # 開發入口點
│   ├── maintenance-log.md     # 維護日誌
│   └── {業務知識}.md           # 業務規則、領域知識
└── archive/                    # 歷史歸檔
```

---

## 執行步驟

### Phase 1: 探索專案
// turbo
1. 列出根目錄結構
// turbo
2. 讀取配置檔（優先：`package.json` > `Cargo.toml` > `pyproject.toml` > `go.mod`）
// turbo
3. 識別框架類型、程式語言、主要模組
// turbo
4. 抽樣 3-5 個代表性程式碼檔案，推斷：
   - 縮排風格、引號風格、分號使用
   - 命名慣例、註解語言
   - 框架特殊慣例

### Phase 2: 創建目錄結構
// turbo
5. 創建所有目錄：
   ```bash
   mkdir -p .windsurf/skills/project-knowledge/{templates,scripts} .memory/{context,archive}
   ```

### Phase 3: 創建 Skill 指令文件
// turbo
6. 創建 `.windsurf/skills/project-knowledge/SKILL.md`（純 AI 行為指令，不含知識內容）

### Phase 4: 生成知識庫文件（存於 `.memory/context/`）
// turbo
7. 創建 `.memory/context/INDEX.md`（快速索引）
// turbo
8. 創建 `.memory/context/architecture.md`（目錄結構）
// turbo
9. 創建 `.memory/context/modules.md`（功能模組）
// turbo
10. 創建 `.memory/context/tech-decisions.md`（技術決策）
// turbo
11. 創建 `.memory/context/entry-points.md`（開發入口）
// turbo
12. 創建 `.memory/context/maintenance-log.md`（維護日誌）

### Phase 5: 填充內容
13. 根據 Phase 1 結果更新（**必須根據實際專案生成，不要照抄模板**）：
    - `.memory/context/INDEX.md`：專案概覽與知識索引
    - `.memory/context/architecture.md`：目錄結構、分層設計
    - `.memory/context/modules.md`：功能模組清單
    - `.memory/context/tech-decisions.md`：技術決策記錄
    - `.memory/context/entry-points.md`：開發入口點

### Phase 6: 驗證
// turbo
14. 驗證：
    - [ ] `project-knowledge/SKILL.md` 存在且格式正確
    - [ ] `.memory/context/INDEX.md` 存在且包含專案概覽
    - [ ] `.memory/context/` 包含 6 個核心檔案
    - [ ] `.memory/archive/` 目錄存在

### Phase 7: 回覆摘要
15. 回覆專案概覽：語言、框架、技術棧、模組數量、創建檔案

---

## 📄 模板說明

模板文件位於 `.windsurf/skills/project-knowledge/templates/`，僅供初始化時參考格式。

**AI 生成知識時必須根據實際專案內容填充，不要照抄模板佔位符。**

| 模板 | 用途 | 生成位置 |
|------|------|----------|
| `templates/INDEX.md` | 快速索引格式 | `.memory/context/INDEX.md` |
| `templates/architecture.md` | 架構描述格式 | `.memory/context/architecture.md` |
| `templates/modules.md` | 模組清單格式 | `.memory/context/modules.md` |
| `templates/tech-decisions.md` | 技術決策格式 | `.memory/context/tech-decisions.md` |
| `templates/entry-points.md` | 開發入口格式 | `.memory/context/entry-points.md` |
| `templates/maintenance-log.md` | 維護日誌格式 | `.memory/context/maintenance-log.md` |

---

## 🔄 與舊結構的對應

| 舊結構 | 新結構 |
|--------|--------|
| `.windsurf/skills/project-knowledge/items/*.md` | `.memory/context/*.md` |
| `.windsurf/skills/project-knowledge/references/*` | `.memory/context/maintenance-log.md` |
| `.project/ARCHITECTURE.md` | `.memory/context/architecture.md` |
| `.project/architecture/*.md` | `.memory/context/*.md` |
| `.project/CONVENTIONS.md` | `.windsurf/skills/*/SKILL.md`（分散到各技能） |
| `.project/PROJECT_STATE.md` | 由 OpenSpec + `/task` workflow 管理 |
| `.project/business/*.md` | `.memory/context/*.md` |
| `.project/archive/*.md` | `.memory/archive/*.md` |