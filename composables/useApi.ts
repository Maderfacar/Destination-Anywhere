// 全域 API Composable
import { api, type ApiResponse, type ApiStatus } from '~/app/protocol/fetch-api'

// 全域 API 狀態枚舉
export const enumApiStatus = ApiStatus

// 主要 API 方法
export const $api = {
  // 用戶相關 API
  async GetUserList(params: { page: number; limit?: number }): Promise<ApiResponse<any[]>> {
    return api.get('/users', params)
  },
  
  async GetUserById(id: string): Promise<ApiResponse<any>> {
    return api.get(`/users/${id}`)
  },
  
  async CreateUser(userData: any): Promise<ApiResponse<any>> {
    return api.post('/users', userData)
  },
  
  async UpdateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return api.put(`/users/${id}`, userData)
  },
  
  async DeleteUser(id: string): Promise<ApiResponse<any>> {
    return api.delete(`/users/${id}`)
  },
  
  // 認證相關 API
  async Login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    return api.post('/auth/login', credentials)
  },
  
  async Register(userData: any): Promise<ApiResponse<any>> {
    return api.post('/auth/register', userData)
  },
  
  async Logout(): Promise<ApiResponse<any>> {
    return api.post('/auth/logout')
  },
  
  async RefreshToken(): Promise<ApiResponse<any>> {
    return api.post('/auth/refresh')
  },
  
  // 目的地相關 API
  async GetDestinationList(params: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<any[]>> {
    return api.get('/destinations', params)
  },
  
  async GetDestinationById(id: string): Promise<ApiResponse<any>> {
    return api.get(`/destinations/${id}`)
  },
  
  async GetPopularDestinations(limit: number = 10): Promise<ApiResponse<any[]>> {
    return api.get('/destinations/popular', { limit })
  },
  
  async GetRecommendedDestinations(userId?: string): Promise<ApiResponse<any[]>> {
    return api.get('/destinations/recommended', { user_id: userId })
  },
  
  // 預訂相關 API
  async CreateBooking(bookingData: any): Promise<ApiResponse<any>> {
    return api.post('/bookings', bookingData)
  },
  
  async GetBookingList(params: { page?: number; limit?: number; user_id?: string }): Promise<ApiResponse<any[]>> {
    return api.get('/bookings', params)
  },
  
  async GetBookingById(id: string): Promise<ApiResponse<any>> {
    return api.get(`/bookings/${id}`)
  },
  
  async UpdateBooking(id: string, bookingData: any): Promise<ApiResponse<any>> {
    return api.put(`/bookings/${id}`, bookingData)
  },
  
  async CancelBooking(id: string): Promise<ApiResponse<any>> {
    return api.post(`/bookings/${id}/cancel`)
  },
  
  // TinyMCE 圖片上傳 API
  async ApiTinymceUpload(formData: FormData): Promise<ApiResponse<{ url: string }>> {
    return api.post('/tinymce/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  // 通用 API 方法
  async GetEnum(enumType: string): Promise<ApiResponse<Record<string, any>>> {
    return api.get(`/enums/${enumType}`)
  },
  
  async GetSettings(): Promise<ApiResponse<Record<string, any>>> {
    return api.get('/settings')
  }
}
