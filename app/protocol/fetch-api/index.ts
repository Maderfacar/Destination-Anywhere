// API 請求層 - 統一處理所有 API 呼叫
import type { FetchError } from 'ofetch'

// API 狀態枚舉
export enum ApiStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

// API 響應格式
export interface ApiResponse<T = any> {
  data: T
  status: {
    code: number
    message: {
      zh_tw: string
      en: string
      ja: string
    }
  }
}

// API 錯誤類型
export interface ApiError {
  code: number
  message: string
  details?: any
}

// 請求配置
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  params?: Record<string, any>
  headers?: Record<string, string>
  timeout?: number
}

// 統一 API 請求函數
export async function apiRequest<T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    params,
    headers = {},
    timeout = 30000
  } = config

  try {
    // 獲取運行時配置
    const { $apiBase } = useRuntimeConfig().public
    
    // 獲取認證 token
    const token = getAuthToken()
    
    // 構建請求頭
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    }
    
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`
    }

    // 發送請求
    const response = await $fetch<ApiResponse<T>>(`${$apiBase}${endpoint}`, {
      method,
      body,
      params,
      headers: requestHeaders,
      timeout
    })

    return response
  } catch (error) {
    const fetchError = error as FetchError
    
    // 處理 401 未授權
    if (fetchError.response?.status === 401) {
      await handleUnauthorized()
    }
    
    // 構建錯誤響應
    const apiError: ApiError = {
      code: fetchError.response?.status || 500,
      message: fetchError.message || 'Network error',
      details: fetchError.data
    }
    
    throw apiError
  }
}

// 獲取認證 token
function getAuthToken(): string | null {
  // 從 cookie 或 localStorage 獲取 token
  const token = useCookie('auth-token')
  return token.value || null
}

// 處理未授權
async function handleUnauthorized(): Promise<void> {
  // 清除 token
  const token = useCookie('auth-token')
  token.value = null
  
  // 重定向到登入頁面
  await navigateTo('/login')
}

// 便捷方法
export const api = {
  get: <T = any>(endpoint: string, params?: Record<string, any>) =>
    apiRequest<T>(endpoint, { method: 'GET', params }),
    
  post: <T = any>(endpoint: string, body?: any) =>
    apiRequest<T>(endpoint, { method: 'POST', body }),
    
  put: <T = any>(endpoint: string, body?: any) =>
    apiRequest<T>(endpoint, { method: 'PUT', body }),
    
  delete: <T = any>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
    
  patch: <T = any>(endpoint: string, body?: any) =>
    apiRequest<T>(endpoint, { method: 'PATCH', body })
}
