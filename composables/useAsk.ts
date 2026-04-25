// 確認對話框 Composable - 替代 ElMessageBox.confirm/prompt
import { ElMessageBox, ElMessage } from 'element-plus'

export interface AskOptions {
  title?: string
  message?: string
  type?: 'warning' | 'info' | 'success' | 'error'
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

export interface PromptOptions extends AskOptions {
  inputType?: 'text' | 'password' | 'textarea'
  inputPlaceholder?: string
  inputValidator?: (value: string) => boolean | string
  inputErrorMessage?: string
  inputValue?: string
}

// 確認對話框
export function UseAsk(options: AskOptions = {}): Promise<boolean> {
  const { $i18n } = useNuxtApp()
  
  const defaultOptions: AskOptions = {
    title: $i18n.t('common.confirm'),
    message: $i18n.t('common.confirm'),
    type: 'warning',
    confirmButtonText: $i18n.t('common.yes'),
    cancelButtonText: $i18n.t('common.no'),
    confirmButtonType: 'primary'
  }
  
  const finalOptions = { ...defaultOptions, ...options }
  
  return ElMessageBox.confirm(finalOptions.message || '', finalOptions.title || '', {
    confirmButtonText: finalOptions.confirmButtonText,
    cancelButtonText: finalOptions.cancelButtonText,
    type: finalOptions.type,
    confirmButtonClass: `el-button--${finalOptions.confirmButtonType}`,
    closeOnClickModal: false,
    closeOnPressEscape: false
  })
    .then(() => true)
    .catch(() => false)
}

// 輸入對話框
export function UsePrompt(options: PromptOptions = {}): Promise<string | null> {
  const { $i18n } = useNuxtApp()
  
  const defaultOptions: PromptOptions = {
    title: $i18n.t('common.confirm'),
    message: $i18n.t('common.confirm'),
    type: 'info',
    confirmButtonText: $i18n.t('common.ok'),
    cancelButtonText: $i18n.t('common.cancel'),
    inputType: 'text',
    inputPlaceholder: '',
    inputValue: ''
  }
  
  const finalOptions = { ...defaultOptions, ...options }
  
  return ElMessageBox.prompt(finalOptions.message || '', finalOptions.title || '', {
    confirmButtonText: finalOptions.confirmButtonText,
    cancelButtonText: finalOptions.cancelButtonText,
    type: finalOptions.type,
    inputType: finalOptions.inputType,
    inputPlaceholder: finalOptions.inputPlaceholder,
    inputValidator: finalOptions.inputValidator,
    inputErrorMessage: finalOptions.inputErrorMessage,
    inputValue: finalOptions.inputValue,
    closeOnClickModal: false,
    closeOnPressEscape: false
  })
    .then(({ value }) => value)
    .catch(() => null)
}

// 警告對話框
export function UseAlert(message: string, title?: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): Promise<void> {
  const { $i18n } = useNuxtApp()
  
  return ElMessageBox.alert(message, title || $i18n.t('common.info'), {
    type,
    confirmButtonText: $i18n.t('common.ok'),
    closeOnClickModal: false,
    closeOnPressEscape: false
  })
    .then(() => {})
    .catch(() => {})
}

// 通知消息
export function UseNotify(message: string, type: 'success' | 'warning' | 'info' | 'error' = 'info'): void {
  ElMessage({
    message,
    type,
    duration: 3000,
    showClose: true
  })
}
