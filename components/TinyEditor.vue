<script setup lang="ts">
// 1. Imports
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/tinymce'

// Import TinyMCE plugins
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/models/dom'

// Import required plugins
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/help'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/autosave'

// 2. Props / Refs / State
interface Props {
  modelValue: string
  initOverrides?: Record<string, any>
  disabled?: boolean
  height?: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  height: 400,
  placeholder: '請輸入內容...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': []
  'blur': []
}>()

const { $apiBase } = useRuntimeConfig().public
const isClient = ref(false)

// 3. Watch / Event Handlers
const handleChange = (content: string) => {
  emit('update:modelValue', content)
  emit('change', content)
}

const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

// 4. Flow Control
// 5. Helpers
const tinymceDefaultInit = {
  height: props.height,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table help wordcount autosave'
  ],
  toolbar: 'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  placeholder: props.placeholder,
  branding: false,
  statusbar: true,
  resize: true,
  readonly: props.disabled,
  language: 'zh_TW',
  
  // 圖片上傳處理
  images_upload_handler: async (blobInfo: any, progress: any) => {
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
  },
  
  // 相對路徑處理
  relative_urls: false,
  remove_script_host: false,
  convert_urls: true,
  
  // 自動儲存
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m'
}

// 合併配置
const tinymceInit = computed(() => {
  return { ...tinymceDefaultInit, ...props.initOverrides }
})

// 6. API Requests
// 7. Lifecycle
onMounted(() => {
  isClient.value = true
})

// 8. Emits
// 9. Expose
defineExpose({
  getEditor: () => {
    // 返回 TinyMCE editor 實例
    return (window as any).tinymce?.activeEditor
  }
})
</script>

<template>
  <ClientOnly>
    <div class="TinyEditor">
      <Editor
        v-if="isClient"
        :api-key="tinymceApiKey"
        v-model="modelValue"
        :init="tinymceInit"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :disabled="disabled"
      />
      <div v-else class="TinyEditor__placeholder">
        <div class="TinyEditor__skeleton">
          <div class="TinyEditor__toolbar"></div>
          <div class="TinyEditor__content"></div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.TinyEditor {
  border-radius: 4px;
  overflow: hidden;
  
  &__placeholder {
    min-height: v-bind('`${height}px`');
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  
  &__skeleton {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  &__toolbar {
    height: 40px;
    background: #f5f7fa;
    border-bottom: 1px solid #dcdfe6;
    background-image: linear-gradient(90deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                      linear-gradient(#f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    animation: skeleton-loading 1.5s infinite ease-in-out;
  }
  
  &__content {
    flex: 1;
    background-image: linear-gradient(90deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                      linear-gradient(#f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    animation: skeleton-loading 1.5s infinite ease-in-out;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 0 0, 10px 10px;
  }
  100% {
    background-position: 20px 20px, 30px 30px;
  }
}

// TinyMCE 樣式覆蓋
:deep(.tox-tinymce) {
  border-radius: 4px !important;
  border: 1px solid #dcdfe6 !important;
  
  &:hover {
    border-color: #c0c4cc !important;
  }
  
  &.tox-tinymce--focused {
    border-color: #409eff !important;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2) !important;
  }
}

:deep(.tox-toolbar__group) {
  border-radius: 4px;
}

:deep(.tox-tbtn) {
  border-radius: 4px;
  margin: 1px;
  
  &:hover {
    background-color: #ecf5ff;
  }
  
  &.tox-tbtn--enabled {
    background-color: #409eff;
    color: white;
  }
}

:deep(.tox-edit-area__iframe) {
  background: white;
}

:deep(.tox-statusbar) {
  border-top: 1px solid #dcdfe6;
  background: #f5f7fa;
}
</style>
