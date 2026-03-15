// firebase-config.js
// 這裡是專案的核心設定，負責初始化並導出常用工具
import { CONFIG } from './config.js?v=6';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 1. 初始化 Firebase App
const app = initializeApp(CONFIG.firebaseConfig);

// 2. 啟動 App Check (防禦機制)
// 這能確保只有你的 LIFF 頁面可以存取資料庫，防止惡意爬蟲
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(CONFIG.appCheckSiteKey),
    isTokenAutoRefreshEnabled: true 
});

// 3. 實例化工具
const db = getFirestore(app);
const storage = getStorage(app);

// 4. 統一導出給其他 HTML 頁面使用
export { db, storage, CONFIG };
