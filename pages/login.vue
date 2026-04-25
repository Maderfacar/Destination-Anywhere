<script setup lang="ts">
// 1. Imports
import { ref, reactive } from 'vue'

// 2. Props / Refs / State
const authStore = useAuthStore()
const { $i18n } = useNuxtApp()

const loginForm = reactive({
  email: '',
  password: ''
})

const formRules = {
  email: [
    { required: true, message: $i18n.t('validation.required'), trigger: 'blur' },
    { type: 'email', message: $i18n.t('validation.email_invalid'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: $i18n.t('validation.required'), trigger: 'blur' },
    { min: 8, message: $i18n.t('validation.password_min_length'), trigger: 'blur' }
  ]
}

const loading = ref(false)
const loginFormRef = ref()

// 3. Watch / Event Handlers
const ClickLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    
    loading.value = true
    const success = await authStore.login(loginForm)
    
    if (success) {
      UseNotify($i18n.t('messages.login_success'), 'success')
      await navigateTo('/')
    } else {
      UseNotify(authStore.error || $i18n.t('messages.login_failed'), 'error')
    }
  } catch (error) {
    console.error('Login validation error:', error)
  } finally {
    loading.value = false
  }
}

const ClickRegister = () => {
  navigateTo('/register')
}

const ClickForgotPassword = () => {
  navigateTo('/forgot-password')
}

// 4. Flow Control
// 5. Helpers
// 6. API Requests
// 7. Lifecycle
onMounted(() => {
  // 如果用戶已經登入，重定向到首頁
  if (authStore.isAuthenticated) {
    navigateTo('/')
  }
})

// 8. Emits
// 9. Expose
</script>

<template lang="pug">
.LoginPage
  .LoginPage__container
    .LoginPage__card
      .LoginPage__header
        h1.LoginPage__title {{ $t('navigation.login') }}
        p.LoginPage__subtitle 登入您的帳戶開始旅程
      
      .LoginPage__form
        el-form(
          ref="loginFormRef" 
          :model="loginForm" 
          :rules="formRules"
          label-position="top"
          @submit.prevent="ClickLogin"
        )
          el-form-item(:label="$t('common.email')" prop="email")
            el-input(
              v-model="loginForm.email"
              type="email"
              :placeholder="$t('validation.email_invalid')"
              maxlength="100"
              inputmode="email"
              prefix-icon="Message"
              clearable
            )
          
          el-form-item(:label="$t('common.password')" prop="password")
            el-input(
              v-model="loginForm.password"
              type="password"
              :placeholder="$t('validation.password_min_length')"
              maxlength="50"
              prefix-icon="Lock"
              show-password
              clearable
            )
          
          el-form-item
            .LoginPage__actions
              el-button(
                type="primary"
                :loading="loading"
                @click="ClickLogin"
                style="width: 100%"
              )
                | {{ $t('navigation.login') }}
      
      .LoginPage__footer
        .LoginPage__links
          el-button(type="text" @click="ClickForgotPassword") 忘記密碼？
          el-button(type="text" @click="ClickRegister") {{ $t('navigation.register') }}
        
        .LoginPage__divider
          span 或
        
        .LoginPage__social
          .LoginPage__socialButton
            el-button(size="large" style="width: 100%")
              el-icon.mr-2 <UserFilled />
              | 使用 Google 登入
          .LoginPage__socialButton
            el-button(size="large" style="width: 100%")
              el-icon.mr-2 <ChatDotRound />
              | 使用 Facebook 登入
</template>

<style lang="scss" scoped>
.LoginPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.LoginPage__container {
  width: 100%;
  max-width: 400px;
}

.LoginPage__card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.LoginPage__header {
  text-align: center;
  margin-bottom: 2rem;
}

.LoginPage__title {
  font-size: 2rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 0.5rem;
}

.LoginPage__subtitle {
  color: #606266;
  font-size: 1rem;
}

.LoginPage__form {
  margin-bottom: 2rem;
}

.LoginPage__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.LoginPage__footer {
  text-align: center;
}

.LoginPage__links {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.LoginPage__divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #dcdfe6;
  }
  
  span {
    background: white;
    padding: 0 1rem;
    color: #909399;
    font-size: 0.875rem;
  }
}

.LoginPage__social {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.LoginPage__socialButton {
  width: 100%;
}

.mr-2 {
  margin-right: 0.5rem;
}

// 響應式設計
@include respond-to-max(sm) {
  .LoginPage {
    padding: 1rem;
  }
  
  .LoginPage__card {
    padding: 1.5rem;
  }
  
  .LoginPage__title {
    font-size: 1.5rem;
  }
}
</style>
