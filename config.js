// config.js
export const CONFIG = {
  // 1. Firebase 連線資訊
  firebaseConfig: {
    apiKey: "AIzaSyCg7ONT1mDIXZplNhTKPHw-cn5UbXFQJyk",
    authDomain: "destination-anywhere-cfd50.firebaseapp.com",
    projectId: "destination-anywhere-cfd50",
    appId: "1:718691467645:web:fb37ce5fa5708c1f788c14"
  },
  
  // 2. 權限管理 (UID 清單)
  ADMIN_UIDS: [
    "Uc5716677131e3d507708995b4e9f7b79", // 超級管理員
    "U56239f33a1cb65c8b1b880f87ea0c2ac", // 識翔
    "U84c34631256a829d5fd8dceed8bd38f3"  // 33
  ],

  // 3. LINE 平台設定
  LIFF_ID: "2009434590-UHOSSHQI",

  // 4. 自動化接點 (Webhook)
  webhooks: {
    // 乘客下單後觸發的 Webhook (index.html 使用)
    newOrder: "你的_INDEX_WEBHOOK_URL", 
    // 管理員調度中心觸發的 Webhook (admin.html 使用)
    adminAction: "https://hook.us2.make.com/te3nqlpvmiekxglqy9jt0xp2org17q5v"
  },

  // 5. 語系支援
  currentLang: "zh", 
  i18n: {
    zh: {
      title: "訂車服務",
      pickup: "上車：",
      dropoff: "下車：",
      addStop: "[ + 新增停靠點 ]",
      confirmBtn: "確認預約行程",
      dispatchBtn: "更新資訊並觸發 LINE 通知",
      customerName: "乘客姓名"
    },
    en: {
      title: "Booking Service",
      pickup: "Pickup:",
      dropoff: "Drop-off:",
      addStop: "[ + Add Stop ]",
      confirmBtn: "Confirm Booking",
      dispatchBtn: "Update & Send Notification",
      customerName: "Customer Name"
    }
  }
};
