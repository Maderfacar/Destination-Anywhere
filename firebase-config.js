// firebase-config.js
// 這裡是專案的核心設定，負責初始化並導出常用工具
// 使用版本號 ?v=99 強制避開瀏覽器快取舊的 Provider ID
import { CONFIG } from './config.js?v=99';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 1. 初始化 Firebase App
const app = initializeApp(CONFIG.firebaseConfig);

// 2. 啟動 App Check (防禦機制)
// 注意：如果換了網域，記得去 Google reCAPTCHA 增加授權網域
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(CONFIG.appCheckSiteKey),
    isTokenAutoRefreshEnabled: true 
});

// 3. 實例化工具
const db = getFirestore(app);
const storage = getStorage(app);

// 4. 統一導出給其他 HTML 頁面使用
export { db, storage, CONFIG };
