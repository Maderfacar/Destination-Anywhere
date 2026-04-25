// 全域工具函數

// Dayjs 工具
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const $dayjs = dayjs

// Lodash 工具
import lodash from 'lodash'

export const $lodash = lodash

// 字串工具
export const $tool = {
  // 格式化日期
  formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
    return $dayjs(date).format(format)
  },
  
  // 相對時間
  fromNow(date: string | Date): string {
    return $dayjs(date).fromNow()
  },
  
  // 產生 UUID
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  
  // 深拷貝
  deepClone<T>(obj: T): T {
    return $lodash.cloneDeep(obj)
  },
  
  // 防抖
  debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    return $lodash.debounce(func, wait) as unknown as T
  },
  
  // 節流
  throttle<T extends (...args: any[]) => any>(func: T, wait: number): T {
    return $lodash.throttle(func, wait) as unknown as T
  },
  
  // 格式化金額
  formatCurrency(amount: number, currency = 'TWD'): string {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency
    }).format(amount)
  },
  
  // 格式化檔案大小
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },
  
  // 手機號碼驗證
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^09\d{8}$/
    return phoneRegex.test(phone)
  },
  
  // Email 驗證
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  // 密碼強度驗證
  isStrongPassword(password: string): boolean {
    // 至少 8 個字元，包含大小寫字母、數字和特殊字元
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return strongPasswordRegex.test(password)
  },
  
  // 產生隨機字串
  randomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },
  
  // 截斷文字
  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  },
  
  // 移除 HTML 標籤
  stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '')
  },
  
  // 轉換為 slug
  slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

// 加密工具
export const $encrypt = {
  // Base64 編碼
  base64Encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)))
  },
  
  // Base64 解碼
  base64Decode(str: string): string {
    return decodeURIComponent(escape(atob(str)))
  },
  
  // MD5 雜湊 (簡單實現)
  async md5(str: string): Promise<string> {
    // 在實際專案中應該使用 crypto-js 或其他加密庫
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
}

// 枚舉工具
export const $enum = {
  // API 狀態
  apiStatus: {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalError: 500
  },
  
  // 用戶角色
  userRole: {
    admin: 'admin',
    user: 'user',
    guest: 'guest'
  },
  
  // 預訂狀態
  bookingStatus: {
    pending: 'pending',
    confirmed: 'confirmed',
    cancelled: 'cancelled',
    completed: 'completed'
  },
  
  // 付款方式
  paymentMethod: {
    creditCard: 'credit_card',
    bankTransfer: 'bank_transfer',
    paypal: 'paypal',
    cash: 'cash'
  },
  
  // 語言
  language: {
    zhTW: 'zh-TW',
    en: 'en'
  },
  
  // 貨幣
  currency: {
    TWD: 'TWD',
    USD: 'USD',
    EUR: 'EUR',
    JPY: 'JPY'
  }
}
