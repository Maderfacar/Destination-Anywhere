// 預訂狀態管理 Store
import { defineStore } from 'pinia'

export interface Booking {
  id: string
  user_id: string
  destination_id: string
  destination_name: string
  destination_name_en: string
  destination_image: string
  travel_dates: {
    start_date: string
    end_date: string
  }
  number_of_travelers: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_method: string
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
  special_requests?: string
}

export interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
  pagination: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export const useBookingStore = defineStore('booking', {
  state: (): BookingState => ({
    bookings: [],
    currentBooking: null,
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
    getBookingById: (state) => (id: string) => {
      return state.bookings.find(booking => booking.id === id)
    },
    
    getBookingsByStatus: (state) => (status: string) => {
      return state.bookings.filter(booking => booking.status === status)
    },
    
    getPendingBookings: (state) => {
      return state.bookings.filter(booking => booking.status === 'pending')
    },
    
    getConfirmedBookings: (state) => {
      return state.bookings.filter(booking => booking.status === 'confirmed')
    },
    
    getCompletedBookings: (state) => {
      return state.bookings.filter(booking => booking.status === 'completed')
    },
    
    getCancelledBookings: (state) => {
      return state.bookings.filter(booking => booking.status === 'cancelled')
    },
    
    getTotalBookings: (state) => {
      return state.bookings.length
    },
    
    getTotalRevenue: (state) => {
      return state.bookings
        .filter(booking => booking.status === 'completed')
        .reduce((total, booking) => total + booking.total_price, 0)
    }
  },

  actions: {
    // 創建預訂
    async createBooking(bookingData: Partial<Booking>) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.CreateBooking(bookingData)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.currentBooking = response.data
          this.bookings.unshift(response.data)
          return response.data
        } else {
          this.error = 'Failed to create booking'
          return null
        }
      } catch (error: any) {
        this.error = error.message || 'Error creating booking'
        return null
      } finally {
        this.loading = false
      }
    },

    // 獲取預訂列表
    async fetchBookings(params: { page?: number; limit?: number; user_id?: string } = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetBookingList(params)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.bookings = response.data
          this.pagination = response.data.pagination
          return true
        } else {
          this.error = 'Failed to fetch bookings'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching bookings'
        return false
      } finally {
        this.loading = false
      }
    },

    // 獲取單個預訂詳情
    async fetchBookingById(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.GetBookingById(id)
        
        if (response.status.code === $enum.apiStatus.success) {
          this.currentBooking = response.data
          return true
        } else {
          this.error = 'Booking not found'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error fetching booking'
        return false
      } finally {
        this.loading = false
      }
    },

    // 更新預訂
    async updateBooking(id: string, bookingData: Partial<Booking>) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.UpdateBooking(id, bookingData)
        
        if (response.status.code === $enum.apiStatus.success) {
          // 更新列表中的預訂
          const index = this.bookings.findIndex(booking => booking.id === id)
          if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], ...response.data }
          }
          
          // 更新當前預訂
          if (this.currentBooking?.id === id) {
            this.currentBooking = { ...this.currentBooking, ...response.data }
          }
          
          return true
        } else {
          this.error = 'Failed to update booking'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error updating booking'
        return false
      } finally {
        this.loading = false
      }
    },

    // 取消預訂
    async cancelBooking(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.CancelBooking(id)
        
        if (response.status.code === $enum.apiStatus.success) {
          // 更新列表中的預訂狀態
          const index = this.bookings.findIndex(booking => booking.id === id)
          if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], status: 'cancelled' }
          }
          
          // 更新當前預訂狀態
          if (this.currentBooking?.id === id) {
            this.currentBooking = { ...this.currentBooking, status: 'cancelled' }
          }
          
          return true
        } else {
          this.error = 'Failed to cancel booking'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error cancelling booking'
        return false
      } finally {
        this.loading = false
      }
    },

    // 確認預訂
    async confirmBooking(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.UpdateBooking(id, { status: 'confirmed' })
        
        if (response.status.code === $enum.apiStatus.success) {
          // 更新列表中的預訂狀態
          const index = this.bookings.findIndex(booking => booking.id === id)
          if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], status: 'confirmed' }
          }
          
          // 更新當前預訂狀態
          if (this.currentBooking?.id === id) {
            this.currentBooking = { ...this.currentBooking, status: 'confirmed' }
          }
          
          return true
        } else {
          this.error = 'Failed to confirm booking'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error confirming booking'
        return false
      } finally {
        this.loading = false
      }
    },

    // 完成預訂
    async completeBooking(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $api.UpdateBooking(id, { status: 'completed' })
        
        if (response.status.code === $enum.apiStatus.success) {
          // 更新列表中的預訂狀態
          const index = this.bookings.findIndex(booking => booking.id === id)
          if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], status: 'completed' }
          }
          
          // 更新當前預訂狀態
          if (this.currentBooking?.id === id) {
            this.currentBooking = { ...this.currentBooking, status: 'completed' }
          }
          
          return true
        } else {
          this.error = 'Failed to complete booking'
          return false
        }
      } catch (error: any) {
        this.error = error.message || 'Error completing booking'
        return false
      } finally {
        this.loading = false
      }
    },

    // 獲取用戶預訂
    async fetchUserBookings(userId: string, params: { page?: number; limit?: number } = {}) {
      return await this.fetchBookings({ ...params, user_id: userId })
    },

    // 清除當前預訂
    clearCurrentBooking() {
      this.currentBooking = null
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
    async initialize(userId?: string) {
      await this.fetchBookings({ user_id: userId })
    }
  }
})
