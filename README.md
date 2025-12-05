# Taiwan We Can

## Licenses and Attributions

我們十分感謝看到這個專案的你。
如果你想要使用我們的論述、Codes 或是任何想要更動的話，要稍微注意一下喔！

### Codes

我們這個專案使用的是 MPL v2.0 進行授權
我們歡迎並且支持你進行改動，但請務必保留原始作者的資訊，並且在你改動的部分標註清楚。

### Thoughts & Contents

我們的想法使用 [Creative Commons BY-ND](./COPYING) 來進行授權。
我們十分歡迎你分享，但為了保證我們的想法不會被斷章取義，請務必保持內容的完整性，並且標註出處。

如果有任何想法，敬請一定要跟我們討論討論。我們十分榮幸跟你交流！

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
