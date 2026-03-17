// firebase-config.js
// 專案核心設定：負責初始化 Firebase 並導出工具
// 使用 v=101 強制避開瀏覽器與 GitHub Pages 的舊快取
import { CONFIG } from './config.js?v=101';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 1. 初始化 Firebase App
const app = initializeApp(CONFIG.firebaseConfig);

// 2. 啟動 App Check (防禦機制)
// 增加錯誤處理預防 reCAPTCHA 密鑰不匹配導致程式崩潰
let appCheck;
try {
    appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(CONFIG.appCheckSiteKey),
        isTokenAutoRefreshEnabled: true 
    });
    console.log("Firebase App Check 啟動成功");
} catch (err) {
    console.warn("App Check 啟動失敗，請檢查 reCAPTCHA SiteKey:", err);
}

// 3. 實例化工具
const db = getFirestore(app);
const storage = getStorage(app);

// 4. 統一導出給其他模組化 HTML 使用
export { db, storage, CONFIG };
