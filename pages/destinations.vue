<script setup lang="ts">
// 1. Imports
import { ref, reactive, onMounted } from 'vue'

// 2. Props / Refs / State
const destinationStore = useDestinationStore()
const { $i18n } = useNuxtApp()

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(12)
const selectedCategory = ref('')
const sortBy = ref('created_at')
const sortOrder = ref('desc')

const searchForm = reactive({
  query: '',
  category: '',
  priceRange: [0, 50000],
  rating: 0,
  duration: ''
})

const categories = [
  { value: '', label: '全部類別' },
  { value: '城市', label: '城市' },
  { value: '古都', label: '古都' },
  { value: '海島', label: '海島' },
  { value: '山區', label: '山區' },
  { value: '鄉村', label: '鄉村' }
]

const sortOptions = [
  { value: 'created_at', label: '最新上架' },
  { value: 'price_from', label: '價格' },
  { value: 'rating', label: '評分' },
  { value: 'reviews_count', label: '評論數' }
]

const priceRanges = [
  { value: [0, 10000], label: 'NT$0 - NT$10,000' },
  { value: [10000, 20000], label: 'NT$10,000 - NT$20,000' },
  { value: [20000, 30000], label: 'NT$20,000 - NT$30,000' },
  { value: [30000, 50000], label: 'NT$30,000 - NT$50,000' },
  { value: [50000, 100000], label: 'NT$50,000+' }
]

// 3. Watch / Event Handlers
const ClickSearch = async () => {
  currentPage.value = 1
  await loadDestinations()
}

const ClickReset = async () => {
  searchForm.query = ''
  searchForm.category = ''
  searchForm.priceRange = [0, 50000]
  searchForm.rating = 0
  searchForm.duration = ''
  currentPage.value = 1
  await loadDestinations()
}

const ClickPageChange = async (page: number) => {
  currentPage.value = page
  await loadDestinations()
}

const ClickSort = async (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
  await loadDestinations()
}

const ClickDestination = (destinationId: string) => {
  navigateTo(`/destinations/${destinationId}`)
}

const ClickBookNow = (destinationId: string) => {
  navigateTo(`/booking?destination=${destinationId}`)
}

// 4. Flow Control
const loadDestinations = async () => {
  const params = {
    page: currentPage.value,
    limit: pageSize.value,
    search: searchForm.query || undefined,
    category: searchForm.category || undefined
  }
  
  await destinationStore.fetchDestinations(params)
}

// 5. Helpers
const formatPrice = (price: number) => {
  return $tool.formatCurrency(price, 'TWD')
}

const formatDate = (date: string) => {
  return $tool.formatDate(date, 'YYYY-MM-DD')
}

const getSortIcon = (field: string) => {
  if (sortBy.value !== field) return 'Sort'
  return sortOrder.value === 'asc' ? 'SortUp' : 'SortDown'
}

const filteredDestinations = computed(() => {
  let destinations = destinationStore.destinations
  
  // 價格篩選
  if (searchForm.priceRange[0] > 0 || searchForm.priceRange[1] < 50000) {
    destinations = destinations.filter(dest => 
      dest.price_from >= searchForm.priceRange[0] && 
      dest.price_from <= searchForm.priceRange[1]
    )
  }
  
  // 評分篩選
  if (searchForm.rating > 0) {
    destinations = destinations.filter(dest => dest.rating >= searchForm.rating)
  }
  
  return destinations
})

// 6. API Requests
// 7. Lifecycle
onMounted(async () => {
  await loadDestinations()
})

// 8. Emits
// 9. Expose
</script>

<template lang="pug">
.DestinationsPage
  .container
    .DestinationsPage__header
      h1.DestinationsPage__title {{ $t('destinations.title') }}
      p.DestinationsPage__subtitle 探索世界各地的精彩目的地
    
    .DestinationsPage__content
      .DestinationsPage__sidebar
        .DestinationsPage__search
          h3.DestinationsPage__sidebarTitle 搜尋目的地
          el-form(:model="searchForm" label-position="top")
            el-form-item(label="關鍵字")
              el-input(
                v-model="searchForm.query"
                placeholder="搜尋目的地名稱或描述"
                maxlength="100"
                clearable
                @keyup.enter="ClickSearch"
              )
            
            el-form-item(label="類別")
              el-select(
                v-model="searchForm.category"
                placeholder="選擇類別"
                clearable
                value-on-clear=""
              )
                el-option(
                  v-for="cat in categories"
                  :key="cat.value"
                  :label="cat.label"
                  :value="cat.value"
                )
            
            el-form-item(label="價格範圍")
              el-slider(
                v-model="searchForm.priceRange"
                :min="0"
                :max="50000"
                :step="1000"
                range
                show-stops
                format-tooltip="(value) => $tool.formatCurrency(value, 'TWD')"
              )
            
            el-form-item(label="最低評分")
              el-rate(
                v-model="searchForm.rating"
                :max="5"
                show-score
                text-color="#ff9900"
              )
            
            el-form-item
              .DestinationsPage__searchActions
                el-button(type="primary" @click="ClickSearch") {{ $t('common.search') }}
                el-button(@click="ClickReset") {{ $t('common.reset') }}
      
      .DestinationsPage__main
        .DestinationsPage__toolbar
          .DestinationsPage__toolbarLeft
            .DestinationsPage__resultCount
              | 找到 {{ filteredDestinations.length }} 個目的地
          
          .DestinationsPage__toolbarRight
            .DestinationsPage__sort
              el-select(
                v-model="sortBy"
                placeholder="排序方式"
                @change="ClickSort"
              )
                el-option(
                  v-for="option in sortOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                )
        
        .DestinationsPage__grid(v-loading="destinationStore.loading")
          .DestinationsPage__destination(
            v-for="destination in filteredDestinations"
            :key="destination.id"
            @click="ClickDestination(destination.id)"
          )
            .DestinationsPage__destinationImage
              img(:src="destination.image || '/placeholder-destination.jpg'" :alt="destination.name")
              .DestinationsPage__destinationBadge(
                v-if="destination.popular"
                class="is-popular"
              ) 熱門
            
            .DestinationsPage__destinationContent
              h3.DestinationsPage__destinationName {{ destination.name }}
              p.DestinationsPage__destinationCategory {{ destination.category }}
              p.DestinationsPage__destinationDescription {{ $tool.truncateText(destination.description, 100) }}
              
              .DestinationsPage__destinationMeta
                .DestinationsPage__destinationPrice
                  span {{ $t('destinations.price_from') }}
                  strong {{ formatPrice(destination.price_from) }}
                
                .DestinationsPage__destinationRating
                  el-rate(
                    :model-value="destination.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  )
                  span ({{ destination.reviews_count }})
                
                .DestinationsPage__destinationDuration
                  el-icon <Clock />
                  | {{ destination.duration }}
              
              .DestinationsPage__destinationTags
                el-tag(
                  v-for="tag in destination.tags.slice(0, 3)"
                  :key="tag"
                  size="small"
                ) {{ tag }}
              
              .DestinationsPage__destinationActions
                el-button(
                  type="primary"
                  size="small"
                  @click.stop="ClickBookNow(destination.id)"
                )
                  | 立即預訂
        
        .DestinationsPage__pagination(v-if="destinationStore.pagination.total_pages > 1")
          el-pagination(
            :current-page="currentPage"
            :page-size="pageSize"
            :total="destinationStore.pagination.total"
            layout="prev, pager, next"
            @current-change="ClickPageChange"
          )
</template>

<style lang="scss" scoped>
.DestinationsPage {
  padding: 2rem 0;
}

.DestinationsPage__header {
  text-align: center;
  margin-bottom: 3rem;
}

.DestinationsPage__title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 1rem;
}

.DestinationsPage__subtitle {
  font-size: 1.1rem;
  color: #606266;
}

.DestinationsPage__content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.DestinationsPage__sidebar {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.DestinationsPage__sidebarTitle {
  font-size: 1.2rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 1rem;
}

.DestinationsPage__searchActions {
  display: flex;
  gap: 1rem;
}

.DestinationsPage__main {
  min-height: 100vh;
}

.DestinationsPage__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.DestinationsPage__resultCount {
  color: #606266;
  font-weight: 500;
}

.DestinationsPage__sort {
  width: 150px;
}

.DestinationsPage__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.DestinationsPage__destination {
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

.DestinationsPage__destinationImage {
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .DestinationsPage__destination:hover & img {
    transform: scale(1.05);
  }
}

.DestinationsPage__destinationBadge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f56c6c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  
  &.is-popular {
    background: #67c23a;
  }
}

.DestinationsPage__destinationContent {
  padding: 1.5rem;
}

.DestinationsPage__destinationName {
  font-size: 1.3rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 0.25rem;
}

.DestinationsPage__destinationCategory {
  color: #909399;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.DestinationsPage__destinationDescription {
  color: #606266;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.DestinationsPage__destinationMeta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.DestinationsPage__destinationPrice {
  color: #409eff;
  font-size: 1.1rem;
  
  strong {
    font-weight: bold;
    font-size: 1.3rem;
  }
}

.DestinationsPage__destinationRating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: #909399;
    font-size: 0.9rem;
  }
}

.DestinationsPage__destinationDuration {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #909399;
  font-size: 0.9rem;
}

.DestinationsPage__destinationTags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.DestinationsPage__destinationActions {
  display: flex;
  justify-content: flex-end;
}

.DestinationsPage__pagination {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

// 響應式設計
@include respond-to-max(lg) {
  .DestinationsPage__content {
    grid-template-columns: 1fr;
  }
  
  .DestinationsPage__sidebar {
    position: static;
  }
  
  .DestinationsPage__grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@include respond-to-max(md) {
  .DestinationsPage__toolbar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .DestinationsPage__sort {
    width: 100%;
  }
  
  .DestinationsPage__grid {
    grid-template-columns: 1fr;
  }
}
</style>
