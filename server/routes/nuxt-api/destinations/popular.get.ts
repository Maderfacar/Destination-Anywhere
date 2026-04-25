// 熱門目的地 API 端點
import { successResponse, badRequestError } from '../../../utils/response'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { limit = 10 } = query
    
    // 模擬熱門目的地資料
    const mockPopularDestinations = [
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
      }
    ]
    
    // 限制數量
    const limitNum = parseInt(limit as string)
    const limitedDestinations = mockPopularDestinations.slice(0, limitNum)
    
    return successResponse(limitedDestinations, {
      zh_tw: '獲取熱門目的地成功',
      en: 'Popular destinations retrieved successfully',
      ja: '人気目的地の取得に成功しました'
    })
  } catch (error) {
    console.error('Get popular destinations error:', error)
    return badRequestError({
      zh_tw: '獲取熱門目的地失敗',
      en: 'Failed to retrieve popular destinations',
      ja: '人気目的地の取得に失敗しました'
    })
  }
})
