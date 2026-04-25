// 認證狀態管理 Store
import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
  created_at: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    userName: (state) => state.user?.name || '',
    userRole: (state) => state.user?.role || 'guest',
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    // 登入
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.Login(credentials)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.user = response.data.user
          this.token = response.data.token
          this.isAuthenticated = true
          
          // 儲存到 cookie
          const tokenCookie = useCookie('auth-token')
          tokenCookie.value = this.token
          
          return true
        } else {
          this.error = 'Login failed'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Login error'
        return false
      } finally {
        this.loading = false
      }
    },

    // 登出
    async logout() {
      this.loading = true
      
      try {
        // 呼叫登出 API
        if (this.token) {
          await $api.Logout()
        }
      } catch (error) {
        console.error('Logout API error:', error)
      } finally {
        // 清除狀態
        this.user = null
        this.token = null
        this.isAuthenticated = false
        this.error = null
        
        // 清除 cookie
        const tokenCookie = useCookie('auth-token')
        tokenCookie.value = null
        
        this.loading = false
        
        // 重定向到登入頁面
        await navigateTo('/login')
      }
    },

    // 註冊
    async register(userData: any) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.Register(userData)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.user = response.data.user
          this.token = response.data.token
          this.isAuthenticated = true
          
          // 儲存到 cookie
          const tokenCookie = useCookie('auth-token')
          tokenCookie.value = this.token
          
          return true
        } else {
          this.error = 'Registration failed'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Registration error'
        return false
      } finally {
        this.loading = false
      }
    },

    // 刷新用戶資訊
    async refreshUser() {
      if (!this.token) return false
      
      this.loading = true
      
      try {
        const response = await $api.GetUserById('me')
        
        if (response.status.code === $enum.apiStatus.success) {
          this.user = response.data
          return true
        } else {
          await this.logout()
          return false
        }
      } catch (error) {
        await this.logout()
        return false
      } finally {
        this.loading = false
      }
    },

    // 檢查認證狀態
    async checkAuth() {
      // 從 cookie 獲取 token
      const tokenCookie = useCookie('auth-token')
      
      if (!tokenCookie.value) {
        return false
      }
      
      this.token = tokenCookie.value
      return await this.refreshUser()
    },

    // 更新用戶資訊
    async updateProfile(userData: Partial<User>) {
      if (!this.user || !this.token) return false
      
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.UpdateUser(this.user.id, userData)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.user = { ...this.user, ...response.data }
          return true
        } else {
          this.error = 'Update profile failed'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Update profile error'
        return false
      } finally {
        this.loading = false
      }
    },

    // 清除錯誤
    clearError() {
      this.error = null
    },

    // 初始化認證狀態
    async initAuth() {
      await this.checkAuth()
    }
  }
})
