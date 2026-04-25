<script setup lang="ts">
// 1. Imports
import { ref, onMounted } from 'vue'

// 2. Props / Refs / State
const popularDestinations = ref([])
const recommendedDestinations = ref([])
const loading = ref(false)

// 3. Watch / Event Handlers
const ClickSearchDestinations = () => {
  navigateTo('/destinations')
}

const ClickBookNow = (destinationId: string) => {
  navigateTo(`/booking?destination=${destinationId}`)
}

// 4. Flow Control
const LoadHomeDataFlow = async () => {
  loading.value = true
  try {
    // 載入熱門目的地
    const popularRes = await $api.GetPopularDestinations(8)
    if (popularRes.status.code === $enum.apiStatus.success) {
      popularDestinations.value = popularRes.data
    }
    
    // 載入推薦目的地
    const recommendedRes = await $api.GetRecommendedDestinations()
    if (recommendedRes.status.code === $enum.apiStatus.success) {
      recommendedDestinations.value = recommendedRes.data
    }
  } catch (error) {
    console.error('Failed to load home data:', error)
  } finally {
    loading.value = false
  }
}

// 5. Helpers
const formatPrice = (price: number) => {
  return $tool.formatCurrency(price, 'TWD')
}

const formatDate = (date: string) => {
  return $tool.formatDate(date, 'MM/DD')
}

// 6. API Requests
// 7. Lifecycle
onMounted(() => {
  LoadHomeDataFlow()
})

// 8. Emits
// 9. Expose
</script>

<template lang="pug">
.IndexPage
  //- Hero Section
  section.IndexPage__hero
    .container
      .IndexPage__heroContent
        h1.IndexPage__heroTitle {{ $t('destinations.title') }}
        p.IndexPage__heroSubtitle 探索世界各地的精彩目的地，打造完美旅程
        .IndexPage__heroActions
          el-button(type="primary" size="large" @click="ClickSearchDestinations")
            el-icon.mr-2 <Search />
            | {{ $t('destinations.search_placeholder') }}
          el-button(size="large" @click="$router.push('/booking')")
            el-icon.mr-2 <Calendar />
            | {{ $t('booking.title') }}

  //- Popular Destinations
  section.IndexPage__section
    .container
      .IndexPage__sectionHeader
        h2.IndexPage__sectionTitle {{ $t('destinations.popular_destinations') }}
        p.IndexPage__sectionSubtitle 發現最受歡迎的旅遊熱點
        el-button(type="text" @click="$router.push('/destinations')")
          | 查看全部 
          el-icon <ArrowRight />
      
      .IndexPage__destinations(v-loading="loading")
        .IndexPage__destination(
          v-for="destination in popularDestinations" 
          :key="destination.id"
          @click="ClickBookNow(destination.id)"
        )
          .IndexPage__destinationImage
            img(:src="destination.image || '/placeholder-destination.jpg'" :alt="destination.name")
          .IndexPage__destinationContent
            h3.IndexPage__destinationName {{ destination.name }}
            p.IndexPage__destinationDescription {{ $tool.truncateText(destination.description, 80) }}
            .IndexPage__destinationMeta
              .IndexPage__destinationPrice
                span {{ $t('destinations.price_from') }}
                strong {{ formatPrice(destination.price_from) }}
              .IndexPage__destinationDuration
                el-icon <Clock />
                | {{ destination.duration }} {{ $t('destinations.duration') }}
              .IndexPage__destinationRating
                el-icon <Star />
                | {{ destination.rating }}
                span ({{ destination.reviews_count }})

  //- Recommended Destinations
  section.IndexPage__section.IndexPage__section--gray
    .container
      .IndexPage__sectionHeader
        h2.IndexPage__sectionTitle {{ $t('destinations.recommended_destinations') }}
        p.IndexPage__sectionSubtitle 根據您的偏好推薦的精選目的地
        el-button(type="text" @click="$router.push('/destinations')")
          | 查看全部 
          el-icon <ArrowRight />
      
      .IndexPage__destinations(v-loading="loading")
        .IndexPage__destination(
          v-for="destination in recommendedDestinations" 
          :key="destination.id"
          @click="ClickBookNow(destination.id)"
        )
          .IndexPage__destinationImage
            img(:src="destination.image || '/placeholder-destination.jpg'" :alt="destination.name")
          .IndexPage__destinationContent
            h3.IndexPage__destinationName {{ destination.name }}
            p.IndexPage__destinationDescription {{ $tool.truncateText(destination.description, 80) }}
            .IndexPage__destinationMeta
              .IndexPage__destinationPrice
                span {{ $t('destinations.price_from') }}
                strong {{ formatPrice(destination.price_from) }}
              .IndexPage__destinationDuration
                el-icon <Clock />
                | {{ destination.duration }} {{ $t('destinations.duration') }}
              .IndexPage__destinationRating
                el-icon <Star />
                | {{ destination.rating }}
                span ({{ destination.reviews_count }})

  //- Features Section
  section.IndexPage__features
    .container
      .IndexPage__featuresGrid
        .IndexPage__feature
          .IndexPage__featureIcon
            el-icon <MapLocation />
          h3 全球目的地
          p 超過 1000+ 個精選旅遊目的地，滿足您的各種需求
        
        .IndexPage__feature
          .IndexPage__featureIcon
            el-icon <Money />
          h3 最優價格
          p 保證市場最具競爭力的價格，讓您的預算發揮最大價值
        
        .IndexPage__feature
          .IndexPage__featureIcon
            el-icon <Service />
          h3 專業服務
          p 24/7 客戶支持，專業旅遊顧問為您規劃完美行程
        
        .IndexPage__feature
          .IndexPage__featureIcon
            el-icon <Shield />
          h3 安全保障
          p 完善的旅遊保險和退款政策，讓您安心出遊
</template>

<style lang="scss" scoped>
.IndexPage {
  &__hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 6rem 0;
    text-align: center;
  }
  
  &__heroContent {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &__heroTitle {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  &__heroSubtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  &__heroActions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  &__section {
    padding: 4rem 0;
    
    &--gray {
      background: #f8f9fa;
    }
  }
  
  &__sectionHeader {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  &__sectionTitle {
    font-size: 2.5rem;
    font-weight: bold;
    color: #303133;
    margin-bottom: 0.5rem;
  }
  
  &__sectionSubtitle {
    font-size: 1.1rem;
    color: #606266;
    margin-bottom: 1rem;
  }
  
  &__destinations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  &__destination {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }
  
  &__destinationImage {
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .IndexPage__destination:hover & img {
      transform: scale(1.05);
    }
  }
  
  &__destinationContent {
    padding: 1.5rem;
  }
  
  &__destinationName {
    font-size: 1.3rem;
    font-weight: bold;
    color: #303133;
    margin-bottom: 0.5rem;
  }
  
  &__destinationDescription {
    color: #606266;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
  
  &__destinationMeta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  &__destinationPrice {
    color: #409eff;
    font-size: 1.1rem;
    
    strong {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
  
  &__destinationDuration,
  &__destinationRating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #909399;
    font-size: 0.9rem;
  }
  
  &__features {
    padding: 4rem 0;
    background: white;
  }
  
  &__featuresGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  &__feature {
    text-align: center;
    padding: 2rem;
    
    .el-icon {
      font-size: 3rem;
      color: #409eff;
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 1.3rem;
      font-weight: bold;
      color: #303133;
      margin-bottom: 1rem;
    }
    
    p {
      color: #606266;
      line-height: 1.6;
    }
  }
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
