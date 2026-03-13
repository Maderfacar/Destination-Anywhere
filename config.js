// config.js
export const CONFIG = {
  // Firebase 設定
  firebaseConfig: {
    apiKey: "AIzaSyCg7ONT1mDIXZplNhTKPHw-cn5UbXFQJyk",
    authDomain: "destination-anywhere-cfd50.firebaseapp.com",
    projectId: "destination-anywhere-cfd50",
    appId: "1:718691467645:web:fb37ce5fa5708c1f788c14"
  },
  
  // 管理員設定
  ADMIN_UIDS: [
    "Uc5716677131e3d507708995b4e9f7b79", // 你本人 (超級管理員)
    "",              // 一般管理員 A
    ""               // 一般管理員 B
  ],

  LIFF_ID: "2009434590-UHOSSHQI",

  // 語系空間預留 (目前預設為 zh)
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
