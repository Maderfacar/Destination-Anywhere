// 彈窗系統 Composable - 統一管理業務彈窗
import { markRaw, defineAsyncComponent } from 'vue'

export interface OpenOptions {
  title?: string
  width?: string | number
  fullscreen?: boolean
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: (done: () => void) => void
}

export interface OpenDialogOptions extends OpenOptions {
  component: string
  props?: Record<string, any>
  events?: Record<string, Function>
}

// 彈窗狀態管理
const dialogState = reactive({
  visible: false,
  component: null as any,
  props: {} as Record<string, any>,
  events: {} as Record<string, Function>,
  options: {} as OpenOptions
})

// 打開彈窗
export function $open(options: OpenDialogOptions) {
  const { component, props = {}, events = {}, ...dialogOptions } = options
  
  // 動態導入組件
  try {
    const componentPath = `~/app/components/open/${component}`
    dialogState.component = markRaw(defineAsyncComponent(() => import(componentPath)))
  } catch (error) {
    console.error(`Failed to load dialog component: ${component}`, error)
    return Promise.reject(error)
  }
  
  dialogState.props = props
  dialogState.events = events
  dialogState.options = {
    title: 'Dialog',
    width: '50%',
    fullscreen: false,
    modal: true,
    closeOnClickModal: false,
    closeOnPressEscape: true,
    showClose: true,
    ...dialogOptions
  }
  
  dialogState.visible = true
  
  return new Promise((resolve, reject) => {
    dialogState.events.resolve = resolve
    dialogState.events.reject = reject
  })
}

// 關閉彈窗
export function closeDialog(result?: any) {
  dialogState.visible = false
  
  if (dialogState.events.resolve) {
    dialogState.events.resolve(result)
  }
  
  // 清理狀態
  setTimeout(() => {
    dialogState.component = null
    dialogState.props = {}
    dialogState.events = {}
    dialogState.options = {}
  }, 300)
}

// 取消彈窗
export function cancelDialog(reason?: any) {
  dialogState.visible = false
  
  if (dialogState.events.reject) {
    dialogState.events.reject(reason)
  }
  
  // 清理狀態
  setTimeout(() => {
    dialogState.component = null
    dialogState.props = {}
    dialogState.events = {}
    dialogState.options = {}
  }, 300)
}

// 彈窗管理 Composable
export function UseDialog() {
  return {
    state: readonly(dialogState),
    open: $open,
    close: closeDialog,
    cancel: cancelDialog
  }
}

// 全局註冊彈窗方法
export default function installDialog(app: any) {
  app.config.globalProperties.$open = $open
  app.provide('$open', $open)
}
