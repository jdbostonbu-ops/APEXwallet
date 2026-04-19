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
| **Audio** | ❌ Blocked on panel buttons |  ❌ Audio is inconsistent with both touch devices.

| Feature | Touch Devices |
| :--- | :--- |
| **iPad / Tablets** |  ❌ Partial **Touch interaction** Panel buttons and audio may be disabled depending on browser "Pop-up Blocker" settings. Although, pop-blocker settings can be adjusted, some buttons in panels are still disabled and audio is not fluent across all panels. |
| **iPhone (iOS)** |  ❌ Partial  **Mobile touch interaction** Spatial awareness is active, but audio is blocked in all pop up panels, buttons in panels are disabled, and PDF cannot be viewed. |


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

*  **The APEX hurdles:**  To overcome this hurdle, I added style="cursor: pointer; to the splash container: `<div id="splash-container"  style="cursor: pointer;">` This unlocks the browser's audio context but requires the user to click anywhere on the screen to initiate the audio. Once this link is established, all subsequent `mouseenter` events, hovers, or spatial sounds are permitted to function seamlessly across the app. 


*  **The Background:** The animated background was adopted by a lesson on web.dev: https://web.dev/learn/accessibility/motion. I took the SCSS code and used AI to convert the code to CSS, then I used the html code to apply the animated background and added a reveal logic to reveal the audio wallet using log-in access. Password demo.


### 2. The Dropdown Audio Dilemma: `<option>` vs. `<li>` or `<a>`
A primary hurdle in creating an accessible sensory menu was the limitation of standard HTML forms. Standard HTML `<select>` and `<option>` elements are typically rendered by the Operating System's UI layer rather than the browser's document flow. 

I had to replace native elements with **Dropdowns** using `<ul>` and `<li>` tags. Unlike standard options, `<li>` and `<a>` tags are true DOM elements that support full event listeners with audio function `<option>` did not. However, I still kept a drop down using `<option>` for the voice preferences on the wallet because it was the easiest to integrate in the main wallet app page.

*   **The Conflict:** Because they are not part of the standard browser DOM, these native elements **do not trigger `mouseenter`, `hover`, or `touchstart` events.** This rendered them "silent" to users attempting to explore the screen via touch or mouse movement. While the UI remained functional for making a selection, it failed to provide the necessary audible announcement required to access the "vocal preview preference".


#### 3. Asynchronous Data Fetching
The app uses the `fetch` API combined with `Promise.all` to pull real-time crypto market data from decentralized financial APIs without a backend server. I selected 4 crypto assets to display the real-time market data.
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
*   **Stealth Mode:** A global privacy toggle that applies a `12px` blur to all currency values (`body.stealth-active .value`) on place holders and the main wallet but not the pre-scripted panels. This state resets upon page refresh to ensure data security.
*   **Voice Guides:** Multiple regional accents (Nicole, Rory, Allen, Labhaoise) allow users to choose a guide they find most comfortable.
*   **Slider:** A slider used to adjust the spending limit uses the browser audio to announce the limit.
*   **Integrated Search:** A built-in Google Custom Search Engine (CSE) for financial research that stays within the accessible UI.
*   **Accessible Document Handling:** An **Alert Panel** allows users to vocalize warnings and open secure PDF documents (e.g., identity theft resources) using a consistent double-click gesture.
*   **Dynamic Profile Management:** A customizable profile panel for status updates and **Double-Click Customize the profile image** or use avatars with audible confirmation.
*   **Live Crypto Ticker:** Real-time data fetching via asynchronous API calls, updating asset valuations every 30 seconds.
*   **Logout:** A shutdown sequence confirming the reset of all demo data before returning to the home screen.

---

## 💻 Tech Stack & Implementation

APEX is built as a **pure front-end application**, ensuring zero-latency audio triggers, and total user privacy by processing all data locally within the browser.

### **Core Technologies**
*   **HTML5 Semantic Markup:** Utilized to build a robust structural "map" that assistive technologies and spatial listeners can navigate reliably.
*   **CSS3 Advanced Styling:** Leverages **Flexbox** and **Grid** for spatial positioning, along with background animation, and **CSS Filters** (e.g., the global 12px blur) to handle Stealth Mode transitions. 
*   **Vanilla JavaScript (ES6+):** The engine of the wallet. It manages the asynchronous "Data-to-Voice" hand-offs, real-time DOM manipulation for panel visibility, google search, button and dropdown audio triggers and crypto ticker.




 
