import { CONFIG } from './config.js?v=105';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const app = initializeApp(CONFIG.firebaseConfig);

try {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(CONFIG.appCheckSiteKey),
    isTokenAutoRefreshEnabled: true 
  });
} catch (e) {
  console.warn("App Check Init Skip");
}

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, CONFIG };
