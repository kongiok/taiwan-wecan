# Taiwan We Can

## Tech Stack

- Nuxt 4
- Nuxt UI 4
- Nuxt I18n
- Content

## Internalization (I18n)

我們使用 Nuxt I18n， Based on Vue I18n 作為這個專案多語系的方案。
在命名方面，我們採用的是三層式架構。

### 1. Domain（領域）

代表「功能或上下文區塊」的最高層級，用來區分不同模組。
每個 Domain 對應一個獨立的語意範圍，例如：
• qna（問答功能）
• auth（登入註冊）
• layout（站台外框）

Domain 用來回答：「這段文案屬於哪個功能？」

### 2. Section（子分類）

Domain 內部的細部分類，用來整理該功能中的不同用途。常見類型：
• actions：按鈕行為、可觸發的動作
• labels：表單欄位、placeholder
• messages：提示訊息、錯誤或狀態
• titles：標題文字

Section 用來回答：「這段文案在這個功能中負責什麼角色？」

### 3. Item（具體字串）

實際使用的文案 key，是最終會被渲染的文字本身。
例如：
• copyLink
• noResult
• searchPlaceholder

Item 用來回答：「具體要顯示的文字是什麼？」
