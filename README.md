# APEX Audio Wallet


**👤 Author:** Jacqueline  

**🔗 GitHub Profile:** [Profile Page](https://github.com/jdbostonbu-ops)

**APEX Audio Wallet:** [Visit APEXwallet](https://jdbostonbu-ops.github.io/APEXwallet/)

**APEX** is an audio demo to illustrate an audio wallet created to explore and push the boundaries of **Web Accessibility (A11y)** for visually impaired or visually challenged individuals. By moving away from standard screen-reader reliance, APEX implements a "Sound-First" architecture where navigation is based on spatial memory, high-contrast visuals, and immediate audible feedback. The project serves as a technical exploration into how financial tools can be made more inclusive and intuitive through immersive, non-visual cues.

1. Vocal Guidance: Using speech instead of just visual icons.
2. High Contrast: Making colors stand out for low-vision users.
3. Spatial Logic: Ensuring buttons are large and easy to find by touch

---
### 📱 Mobile Browser Comparison (iOS)

The following table highlights the behavioral differences between Safari and Chrome on iPad and iPhone devices:

| Feature | Safari (iOS) | Chrome (iOS) |
| :--- | :--- | :--- |
| **Panel Alignment** | ✅ Centered Automatically for both browsers | ✅ Centered Automatically for both browsers |
| **PDF Behavior** | ❌  **Blocked** (Safari iOS)  | ✅ **Opens Automatically** (Google Chrome) |
| **Audio** | ❌ Blocked on panel buttons |  ❌ Audio is inconsistent with both browsers.

| Feature | Touch Devices |
| :--- | :--- |
| **iPad / Tablets** |  ❌ Partial **Touch interaction** However, panel buttons and audio may be disabled depending on browser "Pop-up Blocker" settings. |
| **iPhone (iOS)** |  ❌ Partial  **Mobile touch interaction** Spatial awareness is active, but audio is blocked in all pop up panels, and PDF viewers can obstruct panel interactions. This may be an iPhone settings issue.|


### 📱 Browser Compatibility on Macbook Air
| Browser / Device | Status | Performance & Alignment Notes |
| :--- | :--- | :--- |
| **Safari** | ✅ Optimized | **Center Aligned.** Honors the spatial layout perfectly; **Safari is the only browser that centers all panels correctly in the viewport.** |
| **Google Chrome** | ✅ Optimized | **Right Aligned.** Panels **do not open in the center**; they default to the right side of the screen. |
| **Microsoft Edge** | ✅ Optimized | **Right Aligned.** Mirrors Chromium behavior; panels **do not center** and appear on the right. |
| **Firefox** | ✅ Optimized | **Right Aligned.** Panels **do not open in the center**; instead, the viewport renders the panel on the right. |


*   **Mitigation:** I utilized specific flex-box overrides and container constraints to ensure that regardless of the alignment, the "touch targets" remain large and accessible for the user.

## 🛠 Technical Implementation & Challenges

### 1. The "Interaction First" Audio Policy
A core feature of APEX is immediate audible feedback. However, modern browsers have strict security protocols to prevent intrusive noise upon page load.

> "According to both MDN Web Docs and Chrome's Autoplay Policy, a website cannot play unmuted audio upon page arrival via events like hover or mouseenter until a user gesture (such as a click or tap) has occurred first." 
> — **[MDN Web Docs: Autoplay Policy](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)**

*  **The APEX Workflow:**  To overcome this hurdle, I added style="cursor: pointer; to the splash container: <div id="splash-container"  style="cursor: pointer;">.  This initial interaction serves as the "user gesture" required to unlock the browser's audio context. Once this link is established, all subsequent `mouseenter` events, hovers, and spatial sounds are permitted to function seamlessly across the app.

During development, I noted significant variations in how different browser engines handle panel alignment. 

To solve this, **APEX uses spoken audio files for navigation rather than relying on generic pings, chimes, or abstract sounds.** This ensures that even when browser page inconsistencies occur, the user receives clear, descriptive vocal confirmation of their location and actions, bridging the gap created by visual rendering differences by hovering their mouse on the screen to find those prompts.

### 2. The Dropdown Audio Dilemma: `<option>` vs. `<li>` or `<a>`
A primary hurdle in creating an accessible sensory menu was the limitation of standard HTML forms. Standard HTML `<select>` and `<option>` elements are typically rendered by the Operating System's UI layer rather than the browser's document flow.

*   **The Conflict:** Because they are not part of the standard browser DOM, these native elements **do not trigger `mouseenter`, `hover`, or `touchstart` events.** This rendered them "silent" to users attempting to explore the screen via touch or mouse movement. While the UI remained functional for making a selection, it failed to provide the necessary audible announcement required to access the "vocal preview preference".

*   **The Solution:** APEX replaces these native elements with **Custom Spatial Dropdowns** built using `<ul>` and `<li>` tags. Unlike standard options, `<li>` and `<a>` tags are true DOM elements that support full event listeners and audio function. This transition enables the wallet to provide a "vocal preview" of every menu item as the user’s finger or mouse moves across the screen.

#### 3. Asynchronous Data Fetching
The app uses the `fetch` API combined with `Promise.all` to pull real-time market data from decentralized financial APIs without a backend server.
```javascript

const fetchPrices = async () => {
 const [btcRes, ethRes, solRes, carRes] = await Promise.all([
      fetch('https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000'),
      fetch('https://api.diadata.org/v1/assetQuotation/Ethereum/0x0000000000000000000000000000000000000000'),
      fetch('https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000'),
      fetch('https://api.diadata.org/v1/assetQuotation/Cardano/0x0000000000000000000000000000000000000000')
    ]);
    // Prices are injected directly into the DOM via ID selectors
};


## 🚀 Key Features

*   **Spatial Navigation:** Every UI element is tied to a unique pre-recorded audio ID (`data-label`).
*   **Stealth Mode:** A global privacy toggle that applies a `12px` blur to all currency values (`body.stealth-active .value`). This state resets upon page refresh to ensure data security.
*   **Voice Guides:** Multiple regional accents (Nicole, Rory, Allen, Labhaoise) allow users to choose a guide they find most comfortable.
*   **Integrated Search:** A built-in Google Custom Search Engine (CSE) for financial research that stays within the accessible UI.
*   **Accessible Document Handling:** An **Alert Panel** allows users to vocalize warnings and open secure PDF documents (e.g., identity theft resources) using a consistent double-click gesture.
*   **Dynamic Profile Management:** A customizable profile panel for status updates and **Double-Click Custom Uploads** for avatars with audible confirmation.
*   **Live Crypto Ticker:** Real-time data fetching via asynchronous API calls, updating asset valuations every 30 seconds.
*   **"Grand" Logout:** A specialized Irish-themed shutdown sequence confirming the reset of all demo data before returning to the home screen.

---

## 💻 Tech Stack & Implementation

APEX is built as a **pure front-end application**, ensuring high performance, zero-latency audio triggers, and total user privacy by processing all data locally within the browser.

### **Core Technologies**
*   **HTML5 Semantic Markup:** Utilized to build a robust structural "map" that assistive technologies and spatial listeners can navigate reliably.
*   **CSS3 Advanced Styling:** Leverages **Flexbox** and **Grid** for spatial positioning, along with hardware-accelerated **CSS Filters** (e.g., the global 12px blur) to handle Stealth Mode transitions.
*   **Vanilla JavaScript (ES6+):** The engine of the wallet. It manages the asynchronous "Data-to-Voice" hand-offs, real-time DOM manipulation for panel visibility, and the complex event listeners required for the custom dropdown audio triggers.




 
