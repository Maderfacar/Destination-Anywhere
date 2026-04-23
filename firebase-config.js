// Firebase 配置和初始化
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// 初始化 Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage();
    
    // 設定 Firestore 時區
    firebase.firestore().settings({
        timestampsInSnapshots: true
    });
    
    // 導出 Firebase 實例
    window.db = db;
    window.auth = auth;
    window.storage = storage;
    window.firebase = firebase;
} else {
    console.warn('Firebase SDK 未載入，使用模擬模式');
    
    // 模擬 Firebase 功能
    window.db = {
        collection: (name) => ({
            add: (data) => Promise.resolve({ id: 'mock-' + Date.now() }),
            doc: (id) => ({
                update: (data) => Promise.resolve(),
                delete: () => Promise.resolve(),
                get: () => Promise.resolve({ exists: false })
            }),
            where: (field, op, value) => ({
                get: () => Promise.resolve({ empty: true })
            })
        })
    };
    
    window.auth = {
        signInWithEmailAndPassword: (email, password) => Promise.resolve(),
        signOut: () => Promise.resolve(),
        onAuthStateChanged: (callback) => callback(null)
    };
    
    window.storage = {
        ref: (path) => ({
            put: (file) => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } })
        })
    };
}

// Firebase 工具函數
window.FirebaseUtils = {
    // 保存預訂資料
    saveBooking: async (bookingData) => {
        try {
            const docRef = await window.db.collection('bookings').add({
                ...bookingData,
                createdAt: new Date(),
                status: 'pending'
            });
            return docRef.id;
        } catch (error) {
            console.error('保存預訂失敗:', error);
            throw error;
        }
    },
    
    // 獲取預訂資料
    getBookings: async (filters = {}) => {
        try {
            let query = window.db.collection('bookings');
            
            if (filters.status) {
                query = query.where('status', '==', filters.status);
            }
            
            if (filters.date) {
                query = query.where('date', '==', filters.date);
            }
            
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('獲取預訂失敗:', error);
            throw error;
        }
    },
    
    // 更新預訂狀態
    updateBookingStatus: async (bookingId, status) => {
        try {
            await window.db.collection('bookings').doc(bookingId).update({
                status: status,
                updatedAt: new Date()
            });
            return true;
        } catch (error) {
            console.error('更新預訂狀態失敗:', error);
            throw error;
        }
    },
    
    // 保存司機資料
    saveDriver: async (driverData) => {
        try {
            const docRef = await window.db.collection('drivers').add({
                ...driverData,
                createdAt: new Date(),
                status: 'active'
            });
            return docRef.id;
        } catch (error) {
            console.error('保存司機資料失敗:', error);
            throw error;
        }
    },
    
    // 獲取司機資料
    getDrivers: async (filters = {}) => {
        try {
            let query = window.db.collection('drivers');
            
            if (filters.status) {
                query = query.where('status', '==', filters.status);
            }
            
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('獲取司機資料失敗:', error);
            throw error;
        }
    }
};
