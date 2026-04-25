// TinyMCE 配置檔案

// TinyMCE API Key (從環境變數獲取)
export const tinymceApiKey = process.env.TINYMCE_API_KEY || 'no-api-key'

// TinyMCE 工具列配置
export const tinymceToolbar = [
  'undo redo | blocks | ' +
  'bold italic forecolor | alignleft aligncenter alignright alignjustify | ' +
  'bullist numlist outdent indent | removeformat | help'
]

// TinyMCE 插件列表
export const tinymcePlugins = [
  'advlist autolink lists link image charmap print preview anchor',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table help wordcount autosave'
]

// TinyMCE 預設初始化配置
export const tinymceDefaultInit = {
  height: 400,
  menubar: false,
  plugins: tinymcePlugins,
  toolbar: tinymceToolbar.join(' | '),
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  placeholder: '請輸入內容...',
  branding: false,
  statusbar: true,
  resize: true,
  language: 'zh_TW',
  
  // 相對路徑處理
  relative_urls: false,
  remove_script_host: false,
  convert_urls: true,
  
  // 自動儲存
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  
  // 內容過濾
  paste_data_images: true,
  paste_as_text: false,
  paste_merge_formats: true,
  paste_auto_cleanup_on_paste: true,
  
  // 圖片設定
  image_advtab: true,
  image_uploadtab: true,
  image_caption: true,
  
  // 表格設定
  table_default_attributes: {
    border: '1',
    cellspacing: '0',
    cellpadding: '0'
  },
  table_default_styles: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  
  // 連結設定
  link_target_list: [
    { title: '新視窗', value: '_blank' },
    { title: '同一視窗', value: '_self' },
    { title: '父視窗', value: '_parent' },
    { title: '頂層視窗', value: '_top' }
  ],
  
  // 字元設定
  charmap_append: [
    [0x201c, '左雙引號'],
    [0x201d, '右雙引號'],
    [0x2018, '左單引號'],
    [0x2019, '右單引號'],
    [0x2014, '破折號'],
    [0x2026, '刪節號'],
    [0x3001, '頓號'],
    [0x3002, '句號'],
    [0x300c, '左單書名號'],
    [0x300d, '右單書名號'],
    [0x300e, '左雙書名號'],
    [0x300f, '右雙書名號']
  ],
  
  // 字體設定
  font_formats: '宋體=SimSun;黑體=SimHei;微軟正黑體=Microsoft JhengHei;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKDev=Arial Unicode MS, Arial, sans-serif',
  
  // 字體大小設定
  fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt 48pt 72pt',
  
  // 行高設定
  line_height_formats: '1 1.1 1.2 1.3 1.4 1.5 1.6 1.8 2.0',
  
  // 區塊格式設定
  block_formats: '段落=p;標題1=h1;標題2=h2;標題3=h3;標題4=h4;標題5=h5;標題6=h6;預格式化=pre',
  
  // 樣式設定
  style_formats: [
    {
      title: '粗體',
      inline: 'b',
      icon: 'bold'
    },
    {
      title: '斜體',
      inline: 'i',
      icon: 'italic'
    },
    {
      title: '底線',
      inline: 'u',
      icon: 'underline'
    },
    {
      title: '刪除線',
      inline: 'strike',
      icon: 'strikethrough'
    },
    {
      title: '程式碼',
      inline: 'code',
      icon: 'code'
    },
    {
      title: '上標',
      inline: 'sup',
      icon: 'superscript'
    },
    {
      title: '下標',
      inline: 'sub',
      icon: 'subscript'
    },
    {
      title: '重點標示',
      inline: 'span',
      styles: {
        backgroundColor: '#ffff00',
        color: '#000000'
      }
    },
    {
      title: '紅色文字',
      inline: 'span',
      styles: {
        color: '#ff0000'
      }
    },
    {
      title: '綠色文字',
      inline: 'span',
      styles: {
        color: '#008000'
      }
    },
    {
      title: '藍色文字',
      inline: 'span',
      styles: {
        color: '#0000ff'
      }
    }
  ],
  
  // 快捷鍵設定
  shortcuts: [
    { shortcut: 'Ctrl+B', description: '粗體' },
    { shortcut: 'Ctrl+I', description: '斜體' },
    { shortcut: 'Ctrl+U', description: '底線' },
    { shortcut: 'Ctrl+S', description: '儲存' },
    { shortcut: 'Ctrl+Z', description: '復原' },
    { shortcut: 'Ctrl+Y', description: '重做' }
  ],
  
  // 驗證設定
  invalid_elements: 'script,iframe,object,embed',
  valid_children: '+body[style],+div[p],+div[span],+a[img]',
  
  // 清理設定
  cleanup: true,
  cleanup_on_startup: true,
  cleanup_on_save: true,
  
  // 預覽設定
  preview_styles: 'font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius padding margin',
  
  // 全螢幕設定
  fullscreen_native: false,
  
  // 程式碼編輯器設定
  code_dialog_height: 400,
  code_dialog_width: 800,
  
  // 搜尋取代設定
  searchreplace_search_text: '',
  searchreplace_replace_text: '',
  
  // 語言設定
  language_url: '/tinymce/langs/zh_TW.js',
  
  // 主題設定
  skin: 'oxide',
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.css'
}

// 圖片上傳處理函數
export async function tinymceImageUploadHandler(blobInfo: any, progress: (percent: number) => void): Promise<string> {
  const { $apiBase } = useRuntimeConfig().public
  
  try {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    
    const response = await fetch(`${$apiBase}/tinymce/upload`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    
    const result = await response.json()
    
    if (result.status.code === 200) {
      return result.data.url
    } else {
      throw new Error(result.status.message.zh_tw || 'Upload failed')
    }
  } catch (error) {
    console.error('Image upload error:', error)
    throw error
  }
}

// 產生 TinyMCE 初始化配置的函數
export function generateTinymceInit(overrides: Record<string, any> = {}) {
  return {
    ...tinymceDefaultInit,
    images_upload_handler: tinymceImageUploadHandler,
    ...overrides
  }
}

// 驗證 TinyMCE 內容的函數
export function validateTinymceContent(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // 檢查是否包含腳本標籤
  if (/<script/i.test(content)) {
    errors.push('內容不允許包含腳本標籤')
  }
  
  // 檢查是否包含危險的 HTML 標籤
  const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'textarea']
  dangerousTags.forEach(tag => {
    if (new RegExp(`<${tag}`, 'i').test(content)) {
      errors.push(`內容不允許包含 ${tag} 標籤`)
    }
  })
  
  // 檢查內容長度
  if (content.length > 100000) {
    errors.push('內容長度不能超過 100,000 個字元')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// 清理 TinyMCE 內容的函數
export function sanitizeTinymceContent(content: string): string {
  // 移除腳本標籤
  let sanitized = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // 移除危險的 HTML 標籤
  const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'textarea']
  dangerousTags.forEach(tag => {
    sanitized = sanitized.replace(new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi'), '')
    sanitized = sanitized.replace(new RegExp(`<${tag}[^>]*\/>`, 'gi'), '')
  })
  
  // 移除 on* 事件屬性
  sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // 移除 javascript: 協議
  sanitized = sanitized.replace(/javascript:/gi, '')
  
  return sanitized
}
