// config.js
export const CONFIG = {
  // 1. Firebase 連線資訊 (維持不變)
  firebaseConfig: {
    apiKey: "AIzaSyCg7ONT1mDIXZplNhTKPHw-cn5UbXFQJyk",
    authDomain: "destination-anywhere-cfd50.firebaseapp.com",
    projectId: "destination-anywhere-cfd50",
    storageBucket: "destination-anywhere-cfd50.firebasestorage.app",
    appId: "1:718691467645:web:fb37ce5fa5708c1f788c14"
  },
  
  // 2. 權限管理 (!!重要!!) 
  // 注意：當你用新 LIFF 登入後，你的 UID 可能會改變，到時候如果進不去後台，記得回來更新這裡
  ADMIN_UIDS: [
    "Uc5716677131e3d507708995b4e9f7b79", // 這是你在 774 頻道下的 ID
    "U56239f33a1cb65c8b1b880f87ea0c2ac", 
    "U84c34631256a829d5fd8dceed8bd38f3"  
  ],

  // 3. LINE 平台設定 (!!必須更新為新 ID!!)
  LIFF_IDS: {
    PASSENGER: "2009509209-5TaNYcF5", // 乘客端 (Vercel)
    DRIVER: "2009509209-2hGUMoYt"     // 司機端 (GitHub / driver.html)
  },

  // 兼容舊有代碼預設指向 (建議同步更新)
  LIFF_ID: "2009509209-5TaNYcF5",

  // 4. 自動化接點 (Webhook 維持不變)
  webhooks: {
    newOrder: "https://hook.us2.make.com/5gmkpwbfobn8k595pnhjlwm1qim3lcis", 
    adminAction: "https://hook.us2.make.com/te3nqlpvmiekxglqy9jt0xp2org17q5v"
  },

  // ...其餘語系與 App Check 設定維持不變
  currentLang: "zh", 
  appCheckSiteKey: "6Ld6YIssAAAAAJQu3JbvVbdHpoXDnH77u43adUz1"
};
