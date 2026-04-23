// 應用程式配置
const CONFIG = {
    // Firebase 配置
    FIREBASE_CONFIG: {
        apiKey: "your-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef"
    },
    
    // 應用程式設定
    APP_NAME: "Destination Anywhere",
    APP_VERSION: "1.0.0",
    
    // 價格設定
    PRICING: {
        BASE_FARE: 300,
        VAN_SURCHARGE: 100,
        BUS_SURCHARGE: 200,
        PER_KM_RATE: 10
    },
    
    // 聯絡資訊
    CONTACT: {
        PHONE: "+886-2-1234-5678",
        EMAIL: "info@destination-anywhere.com",
        ADDRESS: "台北市信義區信義路五段7號"
    },
    
    // 營業時間
    BUSINESS_HOURS: {
        WEEKDAYS: "08:00 - 22:00",
        WEEKENDS: "09:00 - 23:00"
    }
};

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
