// 目的地列表 API 端點
import { successResponse, badRequestError } from '../../../utils/response'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { page = 1, limit = 10, search } = query
    
    // 模擬目的地資料
    const mockDestinations = [
      {
        id: '1',
        name: '台北',
        name_en: 'Taipei',
        description: '台灣首都，融合現代與傳統的國際都市',
        description_en: 'Capital of Taiwan, an international city blending modern and traditional',
        image: '/images/destinations/taipei.jpg',
        price_from: 8000,
        duration: '3天2夜',
        duration_en: '3D2N',
        rating: 4.8,
        reviews_count: 1250,
        category: '城市',
        category_en: 'City',
        tags: ['美食', '購物', '夜市', '文化'],
        tags_en: ['Food', 'Shopping', 'Night Market', 'Culture'],
        popular: true,
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: '京都',
        name_en: 'Kyoto',
        description: '日本古都，保存完整的傳統建築與文化',
        description_en: 'Ancient capital of Japan, well-preserved traditional architecture and culture',
        image: '/images/destinations/kyoto.jpg',
        price_from: 15000,
        duration: '4天3夜',
        duration_en: '4D3N',
        rating: 4.9,
        reviews_count: 2100,
        category: '古都',
        category_en: 'Historical City',
        tags: ['寺廟', '櫻花', '和服', '懷石料理'],
        tags_en: ['Temples', 'Cherry Blossoms', 'Kimono', 'Kaiseki'],
        popular: true,
        created_at: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        name: '曼谷',
        name_en: 'Bangkok',
        description: '泰國首都，充滿活力的東南亞大都市',
        description_en: 'Capital of Thailand, vibrant Southeast Asian metropolis',
        image: '/images/destinations/bangkok.jpg',
        price_from: 12000,
        duration: '5天4夜',
        duration_en: '5D4N',
        rating: 4.6,
        reviews_count: 890,
        category: '都市',
        category_en: 'City',
        tags: ['寺廟', '街頭美食', '購物', '按摩'],
        tags_en: ['Temples', 'Street Food', 'Shopping', 'Massage'],
        popular: false,
        created_at: '2024-01-03T00:00:00Z'
      },
      {
        id: '4',
        name: '新加坡',
        name_en: 'Singapore',
        description: '現代化島國，多元文化的完美融合',
        description_en: 'Modern island nation, perfect fusion of diverse cultures',
        image: '/images/destinations/singapore.jpg',
        price_from: 18000,
        duration: '3天2夜',
        duration_en: '3D2N',
        rating: 4.7,
        reviews_count: 1560,
        category: '島國',
        category_en: 'Island Nation',
        tags: ['濱海灣', '美食', '購物', '環球影城'],
        tags_en: ['Marina Bay', 'Food', 'Shopping', 'Universal Studios'],
        popular: true,
        created_at: '2024-01-04T00:00:00Z'
      },
      {
        id: '5',
        name: '首爾',
        name_en: 'Seoul',
        description: '韓國首都，K-Pop 與科技的中心',
        description_en: 'Capital of South Korea, center of K-Pop and technology',
        image: '/images/destinations/seoul.jpg',
        price_from: 10000,
        duration: '4天3夜',
        duration_en: '4D3N',
        rating: 4.5,
        reviews_count: 980,
        category: '都市',
        category_en: 'City',
        tags: ['K-Pop', '美妝', '烤肉', '咖啡'],
        tags_en: ['K-Pop', 'Cosmetics', 'BBQ', 'Coffee'],
        popular: false,
        created_at: '2024-01-05T00:00:00Z'
      }
    ]
    
    // 搜尋過濾
    let filteredDestinations = mockDestinations
    if (search) {
      const searchLower = (search as string).toLowerCase()
      filteredDestinations = mockDestinations.filter(dest => 
        dest.name.toLowerCase().includes(searchLower) ||
        dest.name_en.toLowerCase().includes(searchLower) ||
        dest.description.toLowerCase().includes(searchLower) ||
        dest.description_en.toLowerCase().includes(searchLower)
      )
    }
    
    // 分頁處理
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedDestinations = filteredDestinations.slice(startIndex, endIndex)
    
    return successResponse({
      destinations: paginatedDestinations,
      pagination: {
        current_page: pageNum,
        per_page: limitNum,
        total: filteredDestinations.length,
        total_pages: Math.ceil(filteredDestinations.length / limitNum)
      }
    }, {
      zh_tw: '獲取目的地列表成功',
      en: 'Destinations retrieved successfully',
      ja: '目的地リストの取得に成功しました'
    })
  } catch (error) {
    console.error('Get destinations error:', error)
    return badRequestError({
      zh_tw: '獲取目的地列表失敗',
      en: 'Failed to retrieve destinations',
      ja: '目的地リストの取得に失敗しました'
    })
  }
})
