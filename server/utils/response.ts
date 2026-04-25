// 伺服器端統一響應工具函式

export interface ResponseData<T = any> {
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

// 成功響應
export function successResponse<T>(data: T, message?: { zh_tw?: string; en?: string; ja?: string }): ResponseData<T> {
  return {
    data,
    status: {
      code: 200,
      message: {
        zh_tw: message?.zh_tw || '成功',
        en: message?.en || 'Success',
        ja: message?.ja || '成功'
      }
    }
  }
}

// 400 錯誤
export function badRequestError(
  message: { zh_tw?: string; en?: string; ja?: string },
  data?: any
): ResponseData<null> {
  return {
    data: data || null,
    status: {
      code: 400,
      message: {
        zh_tw: message.zh_tw || '請求錯誤',
        en: message.en || 'Bad Request',
        ja: message.ja || 'リクエストエラー'
      }
    }
  }
}

// 401 未授權
export function unauthorizedError(
  message: { zh_tw?: string; en?: string; ja?: string },
  data?: any
): ResponseData<null> {
  return {
    data: data || null,
    status: {
      code: 401,
      message: {
        zh_tw: message.zh_tw || '未授權',
        en: message.en || 'Unauthorized',
        ja: message.ja || '認証されていません'
      }
    }
  }
}

// 403 禁止訪問
export function forbiddenError(
  message: { zh_tw?: string; en?: string; ja?: string },
  data?: any
): ResponseData<null> {
  return {
    data: data || null,
    status: {
      code: 403,
      message: {
        zh_tw: message.zh_tw || '禁止訪問',
        en: message.en || 'Forbidden',
        ja: message.ja || 'アクセス禁止'
      }
    }
  }
}

// 404 未找到
export function notFoundError(
  message: { zh_tw?: string; en?: string; ja?: string },
  data?: any
): ResponseData<null> {
  return {
    data: data || null,
    status: {
      code: 404,
      message: {
        zh_tw: message.zh_tw || '未找到',
        en: message.en || 'Not Found',
        ja: message.ja || '見つかりません'
      }
    }
  }
}

// 500 伺服器錯誤
export function internalServerError(
  message: { zh_tw?: string; en?: string; ja?: string },
  data?: any
): ResponseData<null> {
  return {
    data: data || null,
    status: {
      code: 500,
      message: {
        zh_tw: message.zh_tw || '伺服器錯誤',
        en: message.en || 'Internal Server Error',
        ja: message.ja || 'サーバーエラー'
      }
    }
  }
}

// 驗證錯誤
export function validationError(
  errors: Record<string, string[]>,
  message?: { zh_tw?: string; en?: string; ja?: string }
): ResponseData<null> {
  return {
    data: errors,
    status: {
      code: 400,
      message: {
        zh_tw: message?.zh_tw || '驗證錯誤',
        en: message?.en || 'Validation Error',
        ja: message?.ja || '検証エラー'
      }
    }
  }
}

// 處理 null 值轉換
export function convertNullValues(obj: any): any {
  if (obj === null || obj === undefined) {
    return ''
  }
  
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.map(convertNullValues)
    }
    
    const result: Record<string, any> = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertNullValues(value)
    }
    return result
  }
  
  return obj
}
