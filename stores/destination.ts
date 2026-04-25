// 目的地狀態管理 Store
import { defineStore } from 'pinia'

export interface Destination {
  id: string
  name: string
  name_en: string
  description: string
  description_en: string
  image: string
  price_from: number
  duration: string
  duration_en: string
  rating: number
  reviews_count: number
  category: string
  category_en: string
  tags: string[]
  tags_en: string[]
  popular: boolean
  created_at: string
}

export interface DestinationState {
  destinations: Destination[]
  popularDestinations: Destination[]
  recommendedDestinations: Destination[]
  currentDestination: Destination | null
  loading: boolean
  error: string | null
  pagination: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export const useDestinationStore = defineStore('destination', {
  state: (): DestinationState => ({
    destinations: [],
    popularDestinations: [],
    recommendedDestinations: [],
    currentDestination: null,
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      per_page: 10,
      total: 0,
      total_pages: 0
    }
  }),

  getters: {
    getDestinationById: (state) => (id: string) => {
      return state.destinations.find(dest => dest.id === id)
    },
    
    getPopularDestinations: (state) => {
      return state.destinations.filter(dest => dest.popular)
    },
    
    getDestinationsByCategory: (state) => (category: string) => {
      return state.destinations.filter(dest => dest.category === category)
    },
    
    searchDestinations: (state) => (query: string) => {
      const searchLower = query.toLowerCase()
      return state.destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchLower) ||
        dest.name_en.toLowerCase().includes(searchLower) ||
        dest.description.toLowerCase().includes(searchLower) ||
        dest.description_en.toLowerCase().includes(searchLower) ||
        dest.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
  },

  actions: {
    // 獲取目的地列表
    async fetchDestinations(params: { page?: number; limit?: number; search?: string } = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetDestinationList(params)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.destinations = response.data.destinations
          this.pagination = response.data.pagination
          return true
        } else {
          this.error = 'Failed to fetch destinations'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching destinations'
        return false
      } finally {
        this.loading = false
      }
    },

    // 獲取熱門目的地
    async fetchPopularDestinations(limit: number = 10) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetPopularDestinations(limit)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.popularDestinations = response.data
          return true
        } else {
          this.error = 'Failed to fetch popular destinations'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching popular destinations'
        return false
      } finally {
        this.loading = false
      }
    },

    // 獲取推薦目的地
    async fetchRecommendedDestinations(userId?: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetRecommendedDestinations(userId)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.recommendedDestinations = response.data
          return true
        } else {
          this.error = 'Failed to fetch recommended destinations'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching recommended destinations'
        return false
      } finally {
        this.loading = false
      }
    },

    // 獲取單個目的地詳情
    async fetchDestinationById(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetDestinationById(id)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.currentDestination = response.data
          return true
        } else {
          this.error = 'Destination not found'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching destination'
        return false
      } finally {
        this.loading = false
      }
    },

    // 搜尋目的地
    async searchDestinations(query: string, params: { page?: number; limit?: number } = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetDestinationList({ ...params, search: query })
        
        if (response.status.code === $enum.apiStatus.success) {
          this.destinations = response.data.destinations
          this.pagination = response.data.pagination
          return true
        } else {
          this.error = 'Search failed'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Search error'
        return false
      } finally {
        this.loading = false
      }
    },

    // 按類別獲取目的地
    async fetchDestinationsByCategory(category: string, params: { page?: number; limit?: number } = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetDestinationList({ ...params, category })
        
        if (response.status.code === $enum.apiStatus.success) {
          this.destinations = response.data.destinations
          this.pagination = response.data.pagination
          return true
        } else {
          this.error = 'Failed to fetch destinations by category'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching destinations by category'
        return false
      } finally {
        this.loading = false
      }
    },

    // 清除當前目的地
    clearCurrentDestination() {
      this.currentDestination = null
    },

    // 清除錯誤
    clearError() {
      this.error = null
    },

    // 重置分頁
    resetPagination() {
      this.pagination = {
        current_page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0
      }
    },

    // 初始化載入
    async initialize() {
      await Promise.all([
        this.fetchPopularDestinations(),
        this.fetchDestinations()
      ])
    }
  }
})
