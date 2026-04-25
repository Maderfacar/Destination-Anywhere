// 登入 API 端點
import { successResponse, unauthorizedError, validationError } from '../../../utils/response'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body
    
    // 驗證輸入
    const errors: Record<string, string[]> = {}
    
    if (!email) {
      errors.email = ['Email is required']
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = ['Invalid email format']
    }
    
    if (!password) {
      errors.password = ['Password is required']
    } else if (password.length < 8) {
      errors.password = ['Password must be at least 8 characters']
    }
    
    if (Object.keys(errors).length > 0) {
      return validationError(errors)
    }
    
    // 模擬用戶驗證 (實際專案中應該查詢資料庫)
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      name: 'Test User',
      role: 'user',
      created_at: new Date().toISOString()
    }
    
    // 模擬密碼驗證
    if (email === 'user@example.com' && password === 'password123') {
      // 產生 JWT token (實際專案中應該使用真正的 JWT)
      const token = 'mock-jwt-token-' + Date.now()
      
      // 設定 cookie
      setCookie(event, 'auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      
      return successResponse({
        user: mockUser,
        token
      }, {
        zh_tw: '登入成功',
        en: 'Login successful',
        ja: 'ログイン成功'
      })
    } else {
      return unauthorizedError({
        zh_tw: '電子郵件或密碼錯誤',
        en: 'Invalid email or password',
        ja: 'メールアドレスまたはパスワードが間違っています'
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    return validationError({
      server: ['Internal server error']
    }, {
      zh_tw: '登入失敗',
      en: 'Login failed',
      ja: 'ログイン失敗'
    })
  }
})
